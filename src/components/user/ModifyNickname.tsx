import { TextField } from '@mui/material';
import { useState } from 'react';
import api from '../../api/api.tsx';
import { main } from '../../assets/styles/palettes.ts';
import * as S from '../../pages/user/Register.ts';
import useAuthStore from '../../stores/authStore';
import MainButton from '../common/MainButton.tsx';

interface ModifyNicknameProps {
  onClose: () => void;
  onComplete: (newNickname: string) => void;
}

function ModifyNickname({ onClose, onComplete }: ModifyNicknameProps) {
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
        // 수정폼 종료 및 변경된 닉네임 반영
        onClose();
        onComplete(nickname);
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

export default ModifyNickname;
