import styled from '@emotion/styled';
import { FlexRowBox } from './FlexRowBox';
import { main } from '../../assets/styles/palettes';
import logo from '../../assets/images/logo.png';

function LogoWithText() {
  return (
    <FlexRowBox $alignItems="center" $padding="10px">
      <img src={logo} width={'60vh'} />
      <Title>상추</Title>
    </FlexRowBox>
  );
}

export default LogoWithText;

const Title = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 1.8rem;
  color: ${main};
`;
