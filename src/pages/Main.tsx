import styled from '@emotion/styled';
import logo from '../assets/images/logo.png';

function Main() {
  return (
    <div>
      <img src={logo} width={'200px'} />
      <MainText>상추 메인페이지 입니다</MainText>
    </div>
  );
}

export default Main;

const MainText = styled.div`
  font-family: 'NanumSquareRoundB';
`;
