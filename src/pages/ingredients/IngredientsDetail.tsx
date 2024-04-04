import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import report from '../../assets/images/report.png';
import { LightGray, main } from '../../assets/styles/palettes';
import EmptyData from '../../components/common/EmptyData';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';
import Header from '../../components/common/Header';
import HelpModal from '../../components/common/HelpModal';
import ImageContainer from '../../components/common/ImageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollTopButton from '../../components/common/ScrollTopButton';
import MarketList from '../../components/ingredients/MarketList/MarketList';
import getIngredientDetail from '../../services/ingredient/getIngredientDetail';
import getIngredientOfflineGraph from '../../services/ingredient/getIngredientOfflineGraph';
import getIngredientOnlineGraph from '../../services/ingredient/getIngredientOnlineGraph';
import useAddressStore from '../../stores/useAddressStore';
import { formatDate } from '../Home/Home';
import { UpdateText } from '../Home/Home.styled';

type TodayProps = {
  price: number;
  percent: number;
};

type IngredientGraphProps = {
  offline: ChartDataProps[];
  online: ChartDataProps[];
  offlineToday: TodayProps;
  onlineToday: TodayProps;
  updateAt: string;
};

function IngredientsDetail() {
  const { id: stringId } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옴
  const ingredientId = stringId ? parseInt(stringId, 10) : null; // 문자열인 id를 십진수로 변환
  const [isModalClick, setIsModalClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const { address } = useAddressStore();

  const { isLoading: detailLoading, data: detailData } = useQuery({
    queryKey: ['get-ingredientDetail', ingredientId],
    queryFn: () =>
      ingredientId !== null ? getIngredientDetail(ingredientId) : Promise.reject(new Error('ID is null')),
  });

  const { isLoading: offlineLoading, data: offlineData } = useQuery({
    queryKey: ['get-ingredientOfflineGraph', ingredientId],
    queryFn: () =>
      ingredientId !== null && address && address.lat !== null && address.lng !== null
        ? getIngredientOfflineGraph(ingredientId, address.lat, address.lng)
        : Promise.reject(new Error('ID is null')),
  });

  const { isLoading: onlineLoading, data: onlineData } = useQuery({
    queryKey: ['get-ingredientOnlineGraph', ingredientId],
    queryFn: () =>
      ingredientId !== null ? getIngredientOnlineGraph(ingredientId) : Promise.reject(new Error('ID is null')),
  });
  console.log(offlineData);
  if (detailLoading || offlineLoading || onlineLoading) {
    return <LoadingSpinner />;
  }

  if (!detailData || !offlineData || !onlineData) {
    return <EmptyData />;
  }

  const closeModal = () => setIsModalClick(false);
  const openModal = () => setIsModalClick(true);
  const handleReportClick = (ingredientId: number) => {
    navigate(`/ingredient/report/${ingredientId}`, { state: { name: detailData.name } });
  };

  const ShowGraph = ({ offline, online, offlineToday, onlineToday, updateAt }: IngredientGraphProps) => {
    const offlinechartRef = useRef<HTMLCanvasElement | null>(null);
    const onlinechartRef = useRef<HTMLCanvasElement | null>(null);
    const offlineList: number[] = [];
    const onlineList: number[] = [];
    const dateList: string[] = [];

    for (let i = 0; i < offline.length; i++) {
      offlineList.push(offline[i].price);
      dateList.push(formatDate(offline[i].date));
    }

    for (let i = 0; i < online.length; i++) {
      onlineList.push(online[i].price);
    }

    // if (offline) {
    //   for (let i = 0; i < offline.markets.length; i++) {
    //     const prices = offline.markets[i][4].map((item) => item.price);
    //     offlineList.push(...prices);
    //   }
    // }
    // console.log(online.markets.length);
    // if (online) {
    //   for (let i = 0; i < online.markets.length; i++) {
    //     const prices = online.markets[0][4].map((item) => item.price);
    //     onlineList.push(...prices);
    //   }
    // }
    // console.log(onlineList);
    // // date만 모아놓은 리스트
    // const dateList: string[] = online.markets[0][1]
    //   .slice()
    //   .reverse()
    //   .map((info) => formatDate(info.date));
    const offlineData = {
      labels: dateList,
      datasets: [
        {
          label: '오프라인 최저가',
          borderColor: main,
          data: offlineList,
        },
      ],
    };
    const onlineData = {
      labels: dateList,
      datasets: [
        {
          label: '온라인 최저가',
          borderColor: main,
          data: onlineList,
        },
      ],
    };

    const options = {
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
          display: false,
        },
      },
    } as const;

    useEffect(() => {
      if (offlinechartRef.current && onlinechartRef.current) {
        const offlineChart = new Chart(offlinechartRef.current, {
          type: 'line',
          data: offlineData,
          options: options,
        });
        const onlineChart = new Chart(onlinechartRef.current, {
          type: 'line',
          data: onlineData,
          options: options,
        });
        console.log('start');
        return () => {
          if (offlineChart) offlineChart.destroy();
          if (onlineChart) onlineChart.destroy();
        };
      }
    }, [online, offline]);
    return (
      <div style={{ padding: '1.25rem 1.25rem 0.8rem 1.25rem ', position: 'relative' }}>
        <UpdateText style={{ top: '1rem', right: '0.6rem' }}>{updateAt} 기준</UpdateText>
        <h6 style={{ marginBottom: '0.625rem' }}>오프라인 가격추이</h6>

        {offline.length !== 0 ? (
          <canvas ref={offlinechartRef} style={{ width: '90vw', height: '15vh' }}></canvas>
        ) : (
          <div style={{ fontFamily: 'NanumSquareRoundB', fontSize: '12px' }}>
            설정한 위치의 3km이내에서 판매하지 않는 재료예요.
          </div>
        )}

        <FlexRowBox $alignItems="center" $justifyContent="center" $gap="0.1rem" $margin="0.9rem 0">
          <h6>현재 최저가</h6>
          <h4
            style={{
              color: offlineToday.percent < 0 ? 'blue' : offlineToday.percent > 0 ? 'red' : 'black',
            }}
          >
            {offlineToday.price}({offlineToday.percent}%)
          </h4>
          <h6>원</h6>
        </FlexRowBox>
        <h6 style={{ marginBottom: '0.6rem' }}>온라인 가격추이</h6>
        <canvas ref={onlinechartRef} style={{ width: '90vw', height: '15vh' }}></canvas>
        <FlexRowBox $alignItems="center" $justifyContent="center" $gap="0.1rem" $margin="0.9rem 0">
          <h6>현재 최저가</h6>
          <h4
            style={{
              color: onlineToday.percent < 0 ? 'blue' : onlineToday.percent > 0 ? 'red' : 'black',
            }}
          >
            {onlineToday.price}({onlineToday.percent > 0 ? `+${onlineToday.percent}` : onlineToday.percent}%)
          </h4>
          <h6>원</h6>
        </FlexRowBox>
        <ScrollTopButton />
      </div>
    );
  };

  return (
    <div>
      {/* 농수산물 상세 정보 조회(이름, 구매요령, 이미지)*/}
      <div>
        <Header name={detailData.name} openModal={() => openModal()} isHelp={true} />
        <ImageContainer photo={detailData.img} />
        {isModalClick && <HelpModal knowHow={detailData['know-how']} onClose={closeModal} />}
      </div>
      <div>
        <ShowGraph
          offline={offlineData.data}
          online={onlineData.data}
          offlineToday={offlineData.today}
          onlineToday={onlineData.today}
          updateAt={onlineData.updateAt}
        />
      </div>
      {ingredientId ? (
        <div>
          <FlexColBox $alignItems="center">
            <ReportBox onClick={() => handleReportClick(ingredientId)}>
              <img src={report} style={{ width: '33px', height: '33px' }} />
              <ReportText>가격 분석 리포트 보러가기</ReportText>
            </ReportBox>
          </FlexColBox>
          <MarketList id={ingredientId} />
        </div>
      ) : null}
    </div>
  );
}

export default IngredientsDetail;

const ReportBox = styled(FlexRowBox)`
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  background-color: ${LightGray};
  width: fit-content;
  padding: 1.5vh;
  border-radius: 10px;
  margin-bottom: 1vh;
`;

const ReportText = styled.div`
  font-size: 13px;
  font-family: 'NanumSquareRoundEB';
`;
