import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { main } from '../../assets/styles/palettes.ts';
import { FlexColBox } from '../common/FlexColBox.ts';
import Header from '../common/Header.tsx';
import MainButton from '../common/MainButton.tsx';
import patchUserAddress from '../../services/user/patchUserAddress.ts';
import MyMap from '../../pages/user/MyMap.tsx';
import Swal from 'sweetalert2';

function MyAddress() {
  const [isShowPostCode, setIsShowPostCode] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean | null>(false);

  // 인풋의 주소명
  const [addressName, setAddressName] = useState<string>('');

  // // 사용자가 설정한 주소명
  // const [myAddressName, setMyAddressName] = useState<string | null>('');

  // 주소 저장
  const [myAddress, setMyAddress] = useState<MyAddressProps>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await patchUserAddress();
        if (response) {
          const lat = response.lat;
          const lng = response.lng;
          setMyAddress({ lat, lng });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, [isUpdated]);

  const handleComplete = (data: DaumPostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddressName(fullAddress);
    setIsShowPostCode(false);
  };

  const handleShowPostCode = () => {
    setIsShowPostCode(!isShowPostCode);
  };

  const handleGeocode = async (): Promise<addressProps> => {
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode(
        {
          query: addressName,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return reject('Something wrong!');
          }

          const result = response.v2;
          if (result.addresses[0] === undefined) {
            Swal.fire({
              icon: 'warning',
              text: '유효한 주소를 입력해주세요.',
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: '닫기',
            });
            setAddressName('');
            return reject('잘못된 주소 입력');
          }
          const lat = result.addresses[0].y;
          const lng = result.addresses[0].x;
          const addressName = result.addresses[0].roadAddress;
          resolve({ lat, lng, addressName });
        },
      );
    });
  };

  const useGeocode = async () => {
    try {
      const { lat, lng, addressName } = await handleGeocode();
      if (lat && lng) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        await patchUserAddress(latNum, lngNum);
        setIsUpdated(!isUpdated);
        Swal.fire({
          icon: 'success',
          text: '위치 수정 완료!',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '닫기',
        });
        console.log(addressName)
        // setMyAddressName(addressName);
        setAddressName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlexColBox $alignItems="center" $margin="5vh 0">
      <Header />
      <MainButton text="위치 수정하기" backgroundColor={main} onClick={handleShowPostCode} />
      {isShowPostCode ? (
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} style={{ height: '60vh', marginTop: '2vh' }} />
      ) : null}
      {!myAddress && addressName ? (
        <FlexColBox $padding="3vh" $gap="3vh">
          <SubText>선택한 주소: {addressName}</SubText>
          <MainButton text="저장" backgroundColor={main} onClick={useGeocode} />
        </FlexColBox>
      ) : null}
      {myAddress ? (
        <FlexColBox $padding="5vh 5vh 2vh 5vh">
          {/* <FlexColBox $gap="1vh">
            <h6 style={{ color: main }}>현재 주소</h6>
            <SubText>{address.addressName}</SubText>
          </FlexColBox> */}
          {addressName ? (
            <div>
              <FlexColBox $gap="1vh" $margin="2vh 0">
                <h6 style={{ color: main }}>바꿀 주소</h6>
                <SubText> {addressName}</SubText>
              </FlexColBox>
              <div style={{ textAlign: 'center' }}>
                <MainButton text="저장" backgroundColor={main} onClick={useGeocode} />
              </div>
            </div>
          ) : null}
        </FlexColBox>
      ) : null}

      {myAddress && myAddress.lat && myAddress?.lng ? (
        <MyMap lat={myAddress.lat} lng={myAddress.lng} />
      ) : null}
    </FlexColBox>
  );
}

export default MyAddress;

const SubText = styled.div`
  font-family: 'NanumSquareRoundB';
  word-break: keep-all;
`;
