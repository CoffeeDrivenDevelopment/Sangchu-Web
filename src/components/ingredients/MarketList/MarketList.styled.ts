import styled from '@emotion/styled';
import { Gray } from '../../../assets/styles/palettes';
import { FlexColBox } from '../../common/FlexColBox';

export const SubText = styled.h6`
  font-size: 12px;
  color: ${Gray};
  margin-left: 40px;
`;

export const MarketText = styled.h6`
  font-size: 15px;
  font-family: 'NanumSquareRoundEB';
`;

export const MapIconBox = styled.div`
  width: 30px;
  height: 30px;
`;

export const MapText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 12px;
  color: ${Gray};
  width: 70px;
  text-align: center;
`;

export const EmptyText = styled.h6`
  color: ${Gray};
  font-size: 13px;
  padding: 10px;
  text-align: center;
`;

export const MapBox = styled(FlexColBox)`
  align-items: center;
  justify-content: center;
  gap: 1vh;
  margin-top: 0.2vh;
`;
