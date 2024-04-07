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
import { UpdateText } from '../Home/Home.styled';
import no_image from '../../assets/images/no_image.png';
import patchUserAddress from '../../services/user/patchUserAddress';
import updateFormatDate from '../../hooks/updateFormatDate';
import graphFormatDate from '../../hooks/graphFormatDate';

type TodayProps = {
  price: number;
  percent: number;
};

type IngredientGraphProps = {
  text: string;
  data: ChartDataProps[];
  today: TodayProps;
  updateAt: string;
};

function IngredientsDetail() {
  const { id: stringId } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옴
  const ingredientId = stringId ? parseInt(stringId, 10) : null; // 문자열인 id를 십진수로 변환
  const [isModalClick, setIsModalClick] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await patchUserAddress();
        if (response) {
          const lat = response.lat;
          const lng = response.lng;
          setMyAddress({ lat, lng });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

  // 주소 저장
  const [myAddress, setMyAddress] = useState<MyAddressProps>({
    lat: 0,
    lng: 0,
  });

  const { isLoading: detailLoading, data: detailData } = useQuery({
    queryKey: ['get-ingredientDetail', ingredientId],
    queryFn: () =>
      ingredientId !== null ? getIngredientDetail(ingredientId) : Promise.reject(new Error('ID is null')),
  });

  const { isLoading: offlineLoading, data: offlineData } = useQuery({
    queryKey: ['get-ingredientOfflineGraph', ingredientId],
    queryFn: () =>
      ingredientId !== null && myAddress && myAddress.lat !== null && myAddress.lng !== null
        ? getIngredientOfflineGraph(ingredientId, myAddress.lat, myAddress.lng)
        : Promise.reject(new Error('ID is null')),
  });

  const { isLoading: onlineLoading, data: onlineData } = useQuery({
    queryKey: ['get-ingredientOnlineGraph', ingredientId],
    queryFn: () =>
      ingredientId !== null ? getIngredientOnlineGraph(ingredientId) : Promise.reject(new Error('ID is null')),
  });

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

  const ShowGraph = ({ text, data, today, updateAt }: IngredientGraphProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const dataList: number[] = [];
    const dateList: string[] = [];

    for (let i = 0; i < data.length; i++) {
      dataList.push(data[i].price);
      dateList.push(graphFormatDate(data[i].date));
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
    const chartData = {
      labels: dateList,
      datasets: [
        {
          label: text + '최저가',
          borderColor: main,
          data: dataList,
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
      if (chartRef.current) {
        const myChart = new Chart(chartRef.current, {
          type: 'line',
          data: chartData,
          options: options,
        });

        return () => {
          if (myChart) myChart.destroy();
        };
      }
    });

    return (
      <div style={{ padding: '1.25rem 1.25rem 0.8rem 1.25rem ', position: 'relative' }}>
        <UpdateText style={{ top: '1rem', right: '0.6rem' }}>{updateAt} 기준</UpdateText>
        <h6 style={{ marginBottom: '0.625rem' }}>{text} 가격추이</h6>

        {data.length !== 0 && data.every((item) => item.price === 0) ? (
          <EmptyData />
        ) : data.length !== 0 ? (
          <canvas ref={chartRef} style={{ width: '90vw', height: '15vh' }}></canvas>
        ) : data.length !== 0 && text === '오프라인' ? (
          <div style={{ fontFamily: 'NanumSquareRoundB', fontSize: '12px' }}>
            설정한 위치의 3km이내에서 판매하지 않는 재료예요.
          </div>
        ) : null}

        {data.length !== 0 && !data.every((item) => item.price === 0) ? (
          <FlexRowBox $alignItems="center" $justifyContent="center" $gap="0.1rem" $margin="0.9rem 0">
            <h6>현재 최저가</h6>
            {today.percent > 0 ? (
              <h4
                style={{
                  color: 'red',
                }}
              >
                {today.price.toLocaleString('ko-KR')}(+{today.percent}%)
              </h4>
            ) : today.percent < 0 ? (
              <h4
                style={{
                  color: 'blue',
                }}
              >
                {today.price.toLocaleString('ko-KR')}({today.percent}%)
              </h4>
            ) : (
              <h4
                style={{
                  color: main,
                }}
              >
                {today.price.toLocaleString('ko-KR')}
              </h4>
            )}
            <h6>원</h6>
          </FlexRowBox>
        ) : null}

        <ScrollTopButton />
      </div>
    );
  };

  return (
    <div>
      {/* 농수산물 상세 정보 조회(이름, 구매요령, 이미지)*/}
      <div>
        <Header name={detailData.name} openModal={() => openModal()} isHelp={true} />
        <ImageContainer photo={detailData.img || no_image} />
        {isModalClick && <HelpModal knowHow={detailData['know-how']} onClose={closeModal} />}
      </div>
      <div>
        <ShowGraph
          text="온라인"
          data={onlineData.data}
          today={onlineData.today}
          updateAt={updateFormatDate(onlineData.updateAt)}
        />
        <ShowGraph
          text="오프라인"
          data={offlineData.data}
          today={offlineData.today}
          updateAt={updateFormatDate(onlineData.updateAt)}
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
`;

const ReportText = styled.div`
  font-size: 13px;
  font-family: 'NanumSquareRoundEB';
`;
