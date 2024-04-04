import styled from '@emotion/styled';
import { Gray, LightGray } from '../../assets/styles/palettes';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const TitleText = styled.div`
  display: flex;
  align-items: center;
`;

export const SubText = styled.span`
  color: ${Gray};
  font-size: 18px;
  font-family: 'NanumSquareRoundB';
`;

export const TitleInput = styled.input`
  border: 0;
  border-radius: 10px;
  background-color: ${LightGray};
  min-height: 32px;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-family: 'NanumSquareRoundB';
`;

export const ContentsBox = styled.div`
  position: relative;
  width: 100%;
`;

export const ContentsInput = styled.textarea`
  border: 0;
  border-radius: 10px;
  background-color: ${LightGray};
  width: 100%;
  min-height: 200px;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-family: 'NanumSquareRoundB';
`;

export const LimitText = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  color: ${Gray};
  font-size: 16px;
  font-family: 'NanumSquareRoundB';
  z-index: 3;
`;

export const PhotoContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PhotoBox = styled.div`
  text-align: center;
  border-radius: 10px;
  background-color: ${LightGray};
  width: 80px;
  height: 80px;
  font-size: 50px;
`;

export const BtnBox = styled.div`
  display: flex;
  margin-left: auto;
`;

export const IconBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
`;
