import styled from '@emotion/styled';
import { Gray, main } from '../../assets/styles/palettes';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';

export const Header = styled(FlexRowBox)`
  justify-content: space-between;
  align-items: center;
  padding-right: 4vw;
`;

export const ContentBox = styled.div`
  padding: 2vh 3vh;
`;

export const RecipeBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const TitleText = styled.h5`
  font-family: 'NanumSquareRoundEB';
  color: ${main};
  margin-bottom: 0.5vh;
`;

export const TodayRecipeText = styled(TitleText)`
  text-align: right;
  margin-bottom: 1.2vh;
`;

export const MovieTitleText = styled.h6`
  width: 50vw;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RecipeText = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1;
  text-align: right;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const UpdateText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 12px;
  color: ${Gray};
  position: absolute;
  top: 1.2vh;
  right: 2.2vh;
`;

export const TodayPriceText = styled.h5`
  color: rgb(135, 135, 255);
  font-family: 'NanumSquareRoundEB';
`;

export const ContentText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 12px;
  width: 50vw;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  text-align: right;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const TagText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 14px;
  color: Gray;
`;

export const RecipeSubBox = styled(FlexColBox)`
  text-align: right;
  padding-right: 2.2vw;
  gap: 2vw;
`;

export const MovieSubBox = styled(FlexColBox)`
  padding-left: 4vw;
  gap: 1vh;
`;
