import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { FlexColBox } from './FlexColBox';

type IconBoxProps = {
  img: string;
  text: string;
  percent?: number;
};

// 레시피 카테고리, 재료 리스트(아이콘+네모 컨테이너+아래글자)
// 사용예시: <IconBox img={rice} text="밥"></IconBox>
function IconBox({ img, text, percent }: IconBoxProps) {
  return (
    <FlexColBox $alignItems="center" $width="90px">
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: 0.5,
          }}
        >
          <img src={img} style={{ width: '55px', height: '55px' }} />
          {percent &&
            (percent > 0 ? (
              <PercentAscArea>{`${percent}%`}</PercentAscArea>
            ) : (
              <PercentDescArea>{`${percent}%`}</PercentDescArea>
            ))}
        </Paper>
      </Box>
      <Text>{text}</Text>
    </FlexColBox>
  );
}

export default IconBox;

const Text = styled.div`
  font-family: 'NanumSquareRoundEB';
  padding: 10px;
  word-wrap: break-word;
  word-break: keep-all;
  width: 100%;
  text-align: center;
`;

const PercentAscArea = styled.div`
  font-family: 'NanumSquareRoundEB';
  margin-left: auto;
  color: red;
`;

const PercentDescArea = styled.div`
  font-family: 'NanumSquareRoundEB';
  margin-left: auto;
  color: blue;
`;
