import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import no_image from '../../assets/images/no_image.png';
import EmptyData from '../../components/common/EmptyData';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ShortToggleBar from '../../components/common/ShortToggleBar';
import ReportGraphs from '../../components/report/ReportGraphs';
import ReportPredict from '../../components/report/ReportPredict';
import ReportReasonable from '../../components/report/ReportReasonable';
import ReportTargetPrice from '../../components/report/ReportTargetPrice';
import getPriceInfo from '../../services/report/getPriceInfo';
import useToggleStore from '../../stores/useToggleStore';

function IngredientReport() {
  const { id: stringId } = useParams<{ id?: string }>();
  const id = stringId ? parseInt(stringId, 10) : null;
  const { categoryValue, setCategoryValue } = useToggleStore();
  const location = useLocation();
  const { name } = location.state || {};

  const { isLoading: reportLoading, data: reportData } = useQuery({
    queryKey: ['get-PriceInfo', id],
    queryFn: () => (id !== null ? getPriceInfo(id) : Promise.reject(new Error('ID is null'))),
  });

  useEffect(() => {
    setCategoryValue(0);
  }, [setCategoryValue]);
  const image = reportData?.img ? reportData.img : no_image;
  if (reportLoading) {
    return <LoadingSpinner />;
  }
  if (!reportData) {
    return <EmptyData />;
  }
  return (
    <div>
      <Header />
      <FlexRowBox $justifyContent="center">
        <MainImg src={image} />
        <FlexColBox $padding="10px" $justifyContent="center" $alignItems="center" $gap="7px">
          <h1>{name}</h1>
          <FlexRowBox $gap="3px" $alignItems="center">
            <InfoText>{reportData.content[0]}</InfoText>
            <InfoText
              style={{
                color: reportData.type == '하락' ? 'blue' : reportData.type == '상승' ? 'red' : 'green',
                fontFamily: 'NanumSquareRoundEB',
                fontSize: '15px',
              }}
            >
              {reportData.type}
            </InfoText>
            <InfoText>{reportData.content[1]}</InfoText>
          </FlexRowBox>
        </FlexColBox>
      </FlexRowBox>

      <ReportGraphs />
      <div style={{ padding: '1rem 0.8rem' }}>
        <ShortToggleBar labelType="report" />
        {categoryValue == 0 ? (
          <ReportPredict name={name} />
        ) : categoryValue == 1 ? (
          <ReportReasonable />
        ) : categoryValue == 2 ? (
          <ReportTargetPrice />
        ) : null}
      </div>
    </div>
  );
}

export default IngredientReport;

const MainImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 15px;
`;

const InfoText = styled.div`
  font-size: 13px;
  font-family: 'NanumSquareRoundB';
`;
