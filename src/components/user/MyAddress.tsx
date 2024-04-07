import styled from '@emotion/styled';
import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { main } from '../../assets/styles/palettes.ts';
import useAddressStore from '../../stores/useAddressStore.ts';
import { FlexColBox } from '../common/FlexColBox.ts';
import Header from '../common/Header.tsx';
import MainButton from '../common/MainButton.tsx';
import patchUserAddress from '../../services/user/patchUserAddress.ts';
import MyMap from '../../pages/user/MyMap.tsx';
import Swal from 'sweetalert2';

function MyAddress() {
  const [isShowPostCode, setIsShowPostCode] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<string>('');
  const { address, setAddress } = useAddressStore();

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
    setMyAddress(fullAddress);
    setIsShowPostCode(false);
  };

  const handleShowPostCode = () => {
    setIsShowPostCode(!isShowPostCode);
  };

  const handleGeocode = async (): Promise<addressProps> => {
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode(
        {
          query: myAddress,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return reject('Something wrong!');
          }

          const result = response.v2;
          if (result.addresses[0] === undefined) {
            alert('유효한 주소를 입력해주세요!');
            setMyAddress('');
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
        setAddress(latNum, lngNum, addressName);
        Swal.fire({
          icon: 'success',
          text: '주소 변경 완료!',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '닫기',
        });
        setMyAddress('');
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
      {!address && myAddress ? (
        <FlexColBox $padding="3vh" $gap="3vh">
          <SubText>선택한 주소: {myAddress}</SubText>
          <MainButton text="저장" backgroundColor={main} onClick={useGeocode} />
        </FlexColBox>
      ) : null}
      {address ? (
        <FlexColBox $padding="5vh 5vh 2vh 5vh">
          <FlexColBox $gap="1vh">
            <h6 style={{ color: main }}>현재 주소</h6>
            <SubText>{address.addressName}</SubText>
          </FlexColBox>
          {myAddress ? (
            <div>
              <FlexColBox $gap="1vh" $margin="2vh 0">
                <h6 style={{ color: main }}>바꿀 주소</h6>
                <SubText> {myAddress}</SubText>
              </FlexColBox>
              <div style={{ textAlign: 'center' }}>
                <MainButton text="저장" backgroundColor={main} onClick={useGeocode} />
              </div>
            </div>
          ) : null}
        </FlexColBox>
      ) : null}
      {address && address.lat && address?.lng ? <MyMap lat={address.lat} lng={address.lng} /> : null}
    </FlexColBox>
  );
}

export default MyAddress;

const SubText = styled.div`
  font-family: 'NanumSquareRoundB';
  word-break: keep-all;
`;
