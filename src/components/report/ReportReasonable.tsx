import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { main } from '../../assets/styles/palettes';
import getReasonablePrice from '../../services/report/getReasonablePrice';
import EmptyData from '../common/EmptyData';
import { FlexColBox } from '../common/FlexColBox';
import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';

function ReportReasonable() {
  const { id: stringId } = useParams<{ id?: string }>();
  const id = stringId ? parseInt(stringId, 10) : null;
  const { isLoading: reasonableLoading, data: reasonableData } = useQuery({
    queryKey: ['get-Reasonable', id],
    queryFn: () => (id !== null ? getReasonablePrice(id) : Promise.reject(new Error('ID is null'))),
  });

  function attachParticle(word: string) {
    const lastChar = word.charAt(word.length - 1);
    const uni = lastChar.charCodeAt(0);
    const lastCharIndex = uni - 0xac00;
    const jongIndex = lastCharIndex % 28;

    // 받침이 있으면 "을", 없으면 "를" 반환
    return jongIndex ? word + '을' : word + '를';
  }

  if (reasonableLoading) {
    return <LoadingSpinner />;
  }

  if (!reasonableData) {
    return <EmptyData />;
  }
  return (
    <div>
      <FlexColBox
        $padding="40px 30px 60px 30px"
        $justifyContent="center"
        $alignItems="center"
        style={{ fontFamily: 'NanumSquareRoundB' }}
      >
        <MainImg src={reasonableData.img} />
        <PointText style={{ padding: '10px' }}>
          {reasonableData.price}원(±{reasonableData.diff})
        </PointText>
        <div>지금 많은 사람들이 {attachParticle(reasonableData.name)}</div>
          <FlexRowBox>
            <PointText style={{ fontSize: '15px' }}>{reasonableData.price}</PointText>
            <div>원에 사고 싶어해요.</div>
          </FlexRowBox>
      </FlexColBox>
    </div>
  );
}

export default ReportReasonable;

const PointText = styled.h2`
  color: ${main};
`;

const MainImg = styled.img`
  width: 260px;
  height: 220px;
  border-radius: 10px;
  margin: 15px;
`;
