import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    try {
      const response = await api.delete(`/auth-service/v1/signout`, {
        data: {
          refresh_token: refresh_token,
        },
      });
      if (response.status === 200) {
        console.log('로그아웃 성공');
        console.log(response.data);
        localStorage.removeItem('access_token');
        navigate('/login');
      } else {
        console.error('로그아웃 실패:', response.data);
      }
    } catch (error) {
      console.error('로그아웃 요청 오류:', error);
    }
  };

  return <div onClick={logout}>로그아웃</div>;
};

export default Logout;
