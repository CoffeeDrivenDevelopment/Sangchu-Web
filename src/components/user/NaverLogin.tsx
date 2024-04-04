import styled from '@emotion/styled';
import naverbtn from '../../assets/images/naverbtn.png';

const NaverLoginButton = () => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_NAVER_REDIRECT_URI}/load`;
  const state = 'sangchu';
  const naverLoginUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  const NaverLogin = () => {
    window.location.href = naverLoginUri;
  };

  return (
    <LoginImage>
      <img src={naverbtn} alt="네이버 로그인 버튼" width={'200px'} style={{ cursor: 'pointer' }} onClick={NaverLogin} />
    </LoginImage>
  );
};

const Login = () => {
  return <NaverLoginButton />;
};

export default Login;

const LoginImage = styled.div`
  margin-top: 20px;
`;
