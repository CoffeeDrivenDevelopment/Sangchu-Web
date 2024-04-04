import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../stores/authStore';
import BasketLoadingSpinner from '../../components/common/LoadingSpinner';

function Load() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useAuthStore((state) => state.userData); // store 로그 확인 위해 추가한 코드
  const setUserData = useAuthStore((state) => state.setUserData);
  console.log(location);

  useEffect(() => {
    const sendCodeToServer = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        console.log('code:', code);
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth-service/v1/signin`, {
          code: code,
        });
        if (response.status === 200) {
          console.log('Code sent successfully');
          console.log(response.data);
          const userinfo = response.data.body;
          // 로컬 스토리지 저장
          localStorage.setItem('access_token', userinfo.jwt.access_token);
          localStorage.setItem('refresh_token', userinfo.jwt.refresh_token);
          localStorage.setItem('member_id', userinfo.member_id.toString());
          localStorage.setItem('nickname', userinfo.nickname);
          localStorage.setItem('profile_image', userinfo.profile_image);
          // store에 저장
          setUserData({
            access_token: userinfo.jwt.access_token,
            refresh_token: userinfo.jwt.refresh_token,
            member_id: userinfo.member_id.toString(),
            nickname: userinfo.nickname,
            profile_image: userinfo.profile_image,
          });

          if (userinfo.nickname === null) {
            navigate('/nickname');
          } else {
            navigate('/');
          }
        } else {
          console.error('Failed to send code to server');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error sending code to server:', error);
        navigate('/login');
      }
    };

    sendCodeToServer();
  }, [navigate]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div>
      <BasketLoadingSpinner></BasketLoadingSpinner>
    </div>
  );
}

export default Load;
