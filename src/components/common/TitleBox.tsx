import { Box, Paper } from '@mui/material';
import { FlexRowBox } from './FlexRowBox';
import styled from '@emotion/styled';
import { FlexColBox } from './FlexColBox';
import { main, Gray } from '../../assets/styles/palettes';

type TitleBoxProps = {
  text: string;
  subText?: string;
  img: string;
};

// [사용예시]
// 레시피 메인페이지: <TitleBox text={'레시피 찾기'} subText={'어떤 것을 만들어볼까요?'} img={recipe} />
// 레시피 리스트페이지: <TitleBox text={'반찬'} img={img} />
function TitleBox({ text, subText, img }: TitleBoxProps) {
  return (
    <ParentBox>
      <FlexRowBox $alignItems="center" $justifyContent="center" $gap="15px" $padding="20px 20px 5px 0px">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            width: 80,
            borderRadius: 2.5,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: main,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              borderRadius: 12.5,
            }}
          >
            <img src={img} width={45} height={45} />
          </Paper>
        </Box>
        <FlexColBox $alignItems="center" $gap="5px">
          <TitleText>{text}</TitleText>
          <SubText>{subText}</SubText>
        </FlexColBox>
      </FlexRowBox>
    </ParentBox>
  );
}

export default TitleBox;

const TitleText = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 30px;
  padding-top: 10px;
`;
const SubText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 13px;
  color: ${Gray};
`;

const ParentBox = styled(FlexRowBox)`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
