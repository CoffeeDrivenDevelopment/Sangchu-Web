import styled from '@emotion/styled';
import { FlexRowBox } from './FlexRowBox';
import right_arrow from '../../assets/images/right_arrow.png';
import Link from '@mui/material/Link';

type ShortCutProps = {
  img: string;
  text: string;
  url: string;
};

// 요리법, 요리영상 바로가기
// 요리법: <ShortCut type='recipe' img={recipe} text={'요리법 보러가기'} url={'https://recipe.com'}></ShortCut>
// 요리영상: <ShortCut type="movie" img={youtube} text={'요리영상 보러가기'} url={'https://youtube.com'} />
function ShortCut({ img, text, url }: ShortCutProps) {
  return (
    <div>
      <FlexRowBox $alignItems="center" $gap="5px">
        <Link href={url} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
          <FlexRowBox $alignItems="center" $gap="6px">
            <img src={img} width={'38px'} height={'38px'} />
            <Title>{text}</Title>
            <img src={right_arrow} width={'20px'} height={'20px'} />
          </FlexRowBox>
        </Link>
      </FlexRowBox>
    </div>
  );
}

export default ShortCut;

const Title = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 13px;
`;
