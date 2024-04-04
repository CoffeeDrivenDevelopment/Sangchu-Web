import logo from '../../assets/images/logo.png';
import Login from '../../components/user/NaverLogin';
import * as S from './Register.ts';

function Signup() {
  return (
    <S.Container>
      <S.ContentsBox>
        <img src={logo} width={'200px'} />
        <S.Title>상추</S.Title>
        <S.SubTitle>상상하는 가격으로 추천해드립니다</S.SubTitle>
        <S.MainText>자주 사용하는 아이디로 간편하게</S.MainText>
        <S.MainText>서비스를 이용해보세요</S.MainText>
        <Login />
      </S.ContentsBox>
    </S.Container>
  );
}

export default Signup;
