import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import news from '../../assets/images/news.png';
import rain from '../../assets/images/weathers/rain.png';
import getPredictPrice from '../../services/report/getPredictPrice';
import useWeatherStore from '../../stores/useWeatherStore';
import EmptyData from '../common/EmptyData';
import { FlexColBox } from '../common/FlexColBox';
import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';

function ReportPredict({ name }: NameProps) {
  const { id: stringId } = useParams<{ id?: string }>();
  const id = stringId ? parseInt(stringId, 10) : null;
  const { weatherList } = useWeatherStore();
  const { isLoading: predictLoading, data: predictData } = useQuery({
    queryKey: ['get-Predict', id],
    queryFn: () => (id !== null ? getPredictPrice(id) : Promise.reject(new Error('ID is null'))),
  });

  if (predictLoading) {
    return <LoadingSpinner />;
  }
  if (!predictData) {
    return <EmptyData />;
  }
  return (
    <FlexColBox $padding="40px 10px 20px 20px" style={{ fontFamily: 'NanumSquareRoundB' }}>
      <FlexColBox $gap="40px" $justifyContent="center" $alignItems="center">
        <div>일주일 후 {name}의 가격은...</div>
        <FlexRowBox $alignItems="center" $justifyContent="center" $gap="15px">
          <img src={rain} height={'90px'} width={'90px'} />
          <FlexColBox $alignItems="center" $justifyContent="center" $gap="5px">
            <div>{predictData.weather.day}일 동안</div>
            <h5>{weatherList[predictData.weather.type]}</h5>
          </FlexColBox>
        </FlexRowBox>
        <FlexRowBox $alignItems="center" $justifyContent="center" $gap="15px">
          <img src={news} height={'90px'} width={'90px'} />
          <FlexColBox $alignItems="center" $gap="5px">
            <div>다음과 같은 소식이 있어요.</div>
            <h5>{predictData.news.keyword}</h5>
          </FlexColBox>
        </FlexRowBox>
        <FlexRowBox $alignItems="center" $justifyContent="center" $margin="20px 0 45px 0">
          <div style={{ paddingRight: '2px' }}>따라서</div>
          <FlexRowBox
            style={{
              color: predictData.cost.percent < 0 ? 'blue' : predictData.cost.percent > 0 ? 'red' : 'black',
            }}
          >
            <h6>{predictData.cost.price.toLocaleString('ko-KR')}원</h6>
            <h6>({predictData.cost.percent > 0 ? `+${predictData.cost.percent}` : predictData.cost.percent}%)</h6>
          </FlexRowBox>
          <div>으로 가격이 예상돼요.</div>
        </FlexRowBox>
      </FlexColBox>
    </FlexColBox>
  );
}

export default ReportPredict;
