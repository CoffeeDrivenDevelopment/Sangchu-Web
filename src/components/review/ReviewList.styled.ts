import styled from '@emotion/styled';
import { Gray } from '../../assets/styles/palettes';

export const ReviewContainer = styled.div`
  display: grid;
  padding: 1rem;
  column-gap: 1rem;
  grid-template-columns: 1fr 3fr;
  padding-bottom: 5vh;
`;

export const ReviewBox = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  border-bottom: 1px solid ${Gray};
`;

export const HeaderArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: auto;
  font-family: 'NanumSquareRoundB';
`;

export const Writer = styled.span`
  color: ${Gray};
`;

export const LikeArea = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const ContentsArea = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 12px;
`;

export const SubHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterArea = styled.div`
  gap: 1rem;
  display: flex;
`;

export const ReviewWriteBtn = styled.div`
  display: flex;
  align-items: center;
  font-family: 'NanumSquareRoundEB';
  gap: 0.2rem;
  font-size: 14px;
  margin-left: auto; // 정렬 버튼이 다시 생기면 삭제해줘야 함
`;

export const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'NanumSquareRoundB';
  padding: 2vh 2vh 7vh 2vh;
`;
