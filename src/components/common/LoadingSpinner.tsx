import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import fruitbasketspinner from '../../assets/lotties/fruitbasket.json';

function LoadingSpinner() {
  return (
    <Loading>
      <Lottie animationData={fruitbasketspinner} />
    </Loading>
  );
}

export default LoadingSpinner;

const Loading = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50%;
`;
