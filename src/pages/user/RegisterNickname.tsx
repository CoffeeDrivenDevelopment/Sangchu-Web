import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.tsx';
import wave from '../../assets/images/wave.png';
import useAuthStore from '../../stores/authStore';
import * as S from './Register.ts';
import { main } from '../../assets/styles/palettes.ts';
import MainButton from '../../components/common/MainButton.tsx';
function RegisterNickname() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const { userData, setUserData } = useAuthStore();

  const member_id = localStorage.getItem('member_id');

  const handleNicknameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);

    if (e.target.value.trim() !== '') {
      try {
        const response = await api.get(`/member-service/v1/validate/${e.target.value}`);
        if (response.status === 200) {
          setIsAvailable(response.data.body.usable === true);
        }
      } catch (error) {
        console.error('Error checking nickname:', error);
      }
    }
  };

  const handleNicknameRegister = async () => {
    if (isAvailable === false) {
      try {
        // 닉네임을 백엔드로 전송하는 POST 요청
        const response = await api.patch(`/member-service/v1/profile`, {
          nickname: nickname,
          member_id: member_id,
        });
        console.log('nickname sent successfully', response.data);
        // 로컬스토리지에 저장
        localStorage.setItem('nickname', nickname);
        // 스토어에 저장
        setUserData({
          ...userData,
          nickname: nickname,
        });
        navigate('/address');
      } catch (error) {
        console.error('Error registering nickname:', error);
      }
    } else {
      alert('유효한 닉네임을 입력해주세요');
      console.log('이미 사용 중인 닉네임입니다.');
    }
  };

  return (
    <S.RegisterContainer>
      <S.MainText_wave>
        반가워요!
        <img src={wave} width={'28px'} />
      </S.MainText_wave>
      <S.RegisterMainText>사용할 닉네임을 입력해주세요.</S.RegisterMainText>
      <TextField
        id="standard-basic"
        label="닉네임을 입력하세요(10자이내)"
        variant="standard"
        size="medium"
        helperText={
          isAvailable === false
            ? '사용 가능한 닉네임입니다.'
            : isAvailable === true
              ? '사용 불가능한 닉네임입니다.'
              : ''
        }
        // error={!!isAvailable}
        inputProps={{ maxLength: 10 }}
        onChange={handleNicknameChange}
        style={{ width: '220px' }}
      />
      <S.ButtonBox>
        <MainButton text="닉네임 수정하기" backgroundColor={main} onClick={handleNicknameRegister} />
      </S.ButtonBox>
      <S.RegisterFailed>{isAvailable === true && <span>닉네임 등록이 불가능해요</span>}</S.RegisterFailed>
      <S.RegisterFailed>{isAvailable === true && <span>유효한 닉네임을 입력해주세요</span>}</S.RegisterFailed>
    </S.RegisterContainer>
  );
}

export default RegisterNickname;
