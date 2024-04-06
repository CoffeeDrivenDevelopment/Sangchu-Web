import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Chart } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Gray, LightGray, main } from '../../assets/styles/palettes';
import { formatDate } from '../../pages/Home/Home';
import getOfflineGraph from '../../services/report/getOfflineGraph';
import getOnlineGraph from '../../services/report/getOnlineGraph';
import useAddressStore from '../../stores/useAddressStore';
import EmptyData from '../common/EmptyData';
import FilterButton from '../common/FilterButton';
import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';
import MainButton from '../common/MainButton';
import ScrollTopButton from '../common/ScrollTopButton';

type ShowGraphProps = {
  text: string;
  marketdata: ReportGraphBodyProps;
  filterState: number;
};

function ShowGraph({ text, marketdata, filterState }: ShowGraphProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartColorList = ['rgb(108, 145, 255)', 'rgb(255, 184, 91)', 'rgb(102, 211, 144)'];
  // const targetchartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const MainChart = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: tipOptions,
      });
      return () => {
        if (MainChart) MainChart.destroy();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketdata, filterState]);

  if (marketdata.markets.length === 0) {
    return;
  }
  const dateList: string[] = marketdata.markets[0][filterState].map((info) => formatDate(info.date));
  const pricesArrays: number[][] = [];
  marketdata.markets.forEach((market) => {
    const prices: number[] = market[filterState].map((item) => item.price);
    pricesArrays.push(prices);
  });


  // 데이터셋 동적 생성
  const datasets = marketdata['market-type'].map((marketType, index) => ({
    label: marketType,
    borderColor: chartColorList[index],
    data: pricesArrays[index] || [],
  }));

  // 설정해놓은 목표가가 있다면 목표가 데이터셋 추가
  if (marketdata['target-price']) {
    datasets.push({
      label: '목표가',
      borderColor: 'rgb(255, 0, 0)',
      data: Array(dateList.length).fill(marketdata['target-price']),
    });
  }

  const chartData = {
    labels: dateList,
    datasets: datasets,
  };

  const tipOptions = {
    responsive: false,
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 11,
          },
          boxWidth: 15,
          padding: 15,
        },
      },
    },
  } as const;

  // 추후 여유가 된다면 목표가 그래프 따로 그리기
  // const notipOptions = {
  //   responsive: false,
  //   scales: {
  //     x: {
  //       type: 'category',
  //       position: 'bottom',
  //     },
  //     y: {
  //       type: 'linear',
  //       position: 'left',
  //     },
  //   },

  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       enabled: false,
  //     },
  //   },
  // } as const;

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <FlexRowBox $gap="5px" $alignItems="center" $margin="0 0 25px 0">
        <TitleText>{text}</TitleText>
        <UpdateText>{marketdata.updateAt} 기준</UpdateText>
        <h4>{marketdata['today-minimum-price'].toLocaleString('ko-KR')}원</h4>
      </FlexRowBox>
      <canvas ref={chartRef} style={{ width: '90vw', height: '25vh' }}></canvas>
    </div>
  );
}

function ReportGraphs() {
  const { address } = useAddressStore();
  const { id: stringId } = useParams<{ id?: string }>();
  const id = stringId ? parseInt(stringId, 10) : null;
  const [offlineFilterState, setOfflineFilterState] = useState<number>(1);
  const [onlineFilterState, setOnlineFilterState] = useState<number>(1);

  const { isLoading: offlineReportLoading, data: offlineReportData } = useQuery({
    queryKey: ['get-OfflineReport', id, address],
    queryFn: () =>
      id !== null && address !== null
        ? getOfflineGraph(id, address.lat, address.lng)
        : Promise.reject(new Error('ID is null')),
    // keepPreviousData: true,
  });
  const { isLoading: onlineReportLoading, data: onlineReportData } = useQuery({
    queryKey: ['get-OnlineReport', id],
    queryFn: () => (id !== null ? getOnlineGraph(id) : Promise.reject(new Error('ID is null'))),
    // keepPreviousData: true,
  });
  console.log(offlineReportData);
  console.log(onlineReportData);
  const navigate = useNavigate();
  console.log('state', onlineFilterState);

  const offLineOneWeekOrder = () => {
    setOfflineFilterState(1);
  };

  const offLineTwoWeekOrder = () => {
    setOfflineFilterState(2);
  };
  const offLineFourWeekOrder = () => {
    setOfflineFilterState(4);
  };

  const onlineOneWeekOrder = () => {
    setOnlineFilterState(1);
  };
  const onlineTwoWeekOrder = () => {
    setOnlineFilterState(2);
  };
  const onlineFourWeekOrder = () => {
    setOnlineFilterState(4);
  };

  if (offlineReportLoading || onlineReportLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {!offlineReportData ? (
        <FlexRowBox $justifyContent="center">
          <MainButton text="주소 설정하러 가기" backgroundColor={main} onClick={() => navigate('/address')} />
        </FlexRowBox>
      ) : (
        <ShowGraph text="오프라인 평균" marketdata={offlineReportData} filterState={offlineFilterState} />
      )}
      {offlineReportData?.markets.length !== 0 ? (
        <div>
          {offlineFilterState === 1 ? (
            <FlexRowBox $justifyContent="space-between" $padding="0 12vw" $margin="0 0 3vh 0">
              <FilterButton text="1주" backgroundColor={main} onClick={offLineOneWeekOrder} />
              <FilterButton text="2주" backgroundColor={LightGray} textColor={Gray} onClick={offLineTwoWeekOrder} />
              <FilterButton text="4주" backgroundColor={LightGray} textColor={Gray} onClick={offLineFourWeekOrder} />
            </FlexRowBox>
          ) : offlineFilterState === 2 ? (
            <FlexRowBox $justifyContent="space-between" $padding="0 12vw" $margin="0 0 3vh 0">
              <FilterButton text="1주" backgroundColor={LightGray} textColor={Gray} onClick={offLineOneWeekOrder} />
              <FilterButton text="2주" backgroundColor={main} onClick={offLineTwoWeekOrder} />
              <FilterButton text="4주" backgroundColor={LightGray} textColor={Gray} onClick={offLineFourWeekOrder} />
            </FlexRowBox>
          ) : offlineFilterState === 4 ? (
            <FlexRowBox $justifyContent="space-between" $padding="0 12vw" $margin="0 0 3vh 0">
              <FilterButton text="1주" backgroundColor={LightGray} textColor={Gray} onClick={offLineOneWeekOrder} />
              <FilterButton text="2주" backgroundColor={LightGray} textColor={Gray} onClick={offLineTwoWeekOrder} />
              <FilterButton text="4주" backgroundColor={main} onClick={offLineFourWeekOrder} />
            </FlexRowBox>
          ) : null}
        </div>
      ) : null}

      <hr style={{ margin: '1vh 3vh' }} />

      {!onlineReportData ? (
        <EmptyData />
      ) : (
        <ShowGraph text="온라인 평균" marketdata={onlineReportData} filterState={onlineFilterState} />
      )}
      {onlineFilterState === 1 ? (
        <FlexRowBox $justifyContent="space-between" $padding="0 12vw">
          <FilterButton text="1주" backgroundColor={main} onClick={onlineOneWeekOrder} />
          <FilterButton text="2주" backgroundColor={LightGray} textColor={Gray} onClick={onlineTwoWeekOrder} />
          <FilterButton text="4주" backgroundColor={LightGray} textColor={Gray} onClick={onlineFourWeekOrder} />
        </FlexRowBox>
      ) : onlineFilterState === 2 ? (
        <FlexRowBox $justifyContent="space-between" $padding="0 12vw">
          <FilterButton text="1주" backgroundColor={LightGray} textColor={Gray} onClick={onlineOneWeekOrder} />
          <FilterButton text="2주" backgroundColor={main} onClick={onlineTwoWeekOrder} />
          <FilterButton text="4주" backgroundColor={LightGray} textColor={Gray} onClick={onlineFourWeekOrder} />
        </FlexRowBox>
      ) : onlineFilterState === 4 ? (
        <FlexRowBox $justifyContent="space-between" $padding="0 12vw">
          <FilterButton text="1주" backgroundColor={LightGray} textColor={Gray} onClick={onlineOneWeekOrder} />
          <FilterButton text="2주" backgroundColor={LightGray} textColor={Gray} onClick={onlineTwoWeekOrder} />
          <FilterButton text="4주" backgroundColor={main} onClick={onlineFourWeekOrder} />
        </FlexRowBox>
      ) : null}
      <ScrollTopButton />
    </div>
  );
}

export default ReportGraphs;

const UpdateText = styled.h6`
  font-family: 'NanumSquareRoundB';
  font-size: 13px;
  color: ${Gray};
  position: absolute;
  right: 15px;
  top: 50px;
`;

const TitleText = styled.h6`
  color: ${main};
`;
