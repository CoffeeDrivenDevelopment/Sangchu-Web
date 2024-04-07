import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import MainButton from '../../components/common/MainButton';
import { main } from '../../assets/styles/palettes';
import styled from '@emotion/styled';
import { FlexColBox } from '../../components/common/FlexColBox';
import * as S from './Register.ts';
import { useNavigate } from 'react-router-dom';
import postUserAddress from '../../services/user/patchUserAddress.ts';

function RegisterAddress() {
  const [isShowPostCode, setIsShowPostCode] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<string>('');
  const navigate = useNavigate();

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
      console.log(addressName)
      if (lat && lng) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        await postUserAddress(latNum, lngNum);
        alert('주소 설정 완료!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.RegisterContainer>
      <FlexColBox $alignItems="center" $gap="1vh" $padding="3vh 0">
        <MainText>위치를 등록해주세요.</MainText>
        <MainText>근처 시장의 농수산물 가격을 알려드릴게요!</MainText>
      </FlexColBox>
      <MainButton text="위치 등록하기" backgroundColor={main} onClick={handleShowPostCode} />
      {isShowPostCode ? (
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} style={{ height: '60vh', marginTop: '2vh' }} />
      ) : null}

      {myAddress ? (
        <FlexColBox $padding="3vh" $gap="3vh">
          <SubText>선택한 주소: {myAddress}</SubText>
          <MainButton text="저장" backgroundColor={main} onClick={useGeocode} />
        </FlexColBox>
      ) : null}
    </S.RegisterContainer>
  );
}

export default RegisterAddress;

const MainText = styled.h5`
  word-break: keep-all;
  color: ${main};
`;
const SubText = styled.div`
  word-break: keep-all;
  font-family: 'NanumSquareRoundB';
`;
