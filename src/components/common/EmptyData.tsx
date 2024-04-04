import styled from '@emotion/styled';
import Lottie from 'react-lottie';
import empty from '../../assets/lotties/empty.json';
import { FlexColBox } from './FlexColBox';

type EmptyProps = {
  height?: number;
  width?: number;
};
function EmptyData({ height, width }: EmptyProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <EmptyBox>
      <Lottie options={defaultOptions} height={height} width={width} />
      <div>데이터가 없어요.</div>
    </EmptyBox>
  );
}

export default EmptyData;

const EmptyBox = styled(FlexColBox)`
  justify-content: center;
  align-items: center;
  font-family: 'NanumSquareRoundB';
  gap: 2vh;
  /* padding-top: 50%; */
`;
