import styled from '@emotion/styled';
import { LightGray } from '../../assets/styles/palettes';

export const InformationContainer = styled.div`
  font-family: 'NanumSquareRoundEB';
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const IngredientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${LightGray};
  font-size: 14px;
  padding: 3vh;
  border-radius: 10px;
  word-break: keep-all;
`;

export const LinkBox = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
