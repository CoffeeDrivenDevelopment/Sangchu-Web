import styled from '@emotion/styled';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

function MyPriceList() {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [priceData, setPriceData] = useState<TargetPrice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/recipe-service/v1/targetprice');
        const responseData: TargetApiResponse = response.data;
        setPriceData(responseData.body.target_price_list);
        console.log('목표가 조회 성공', responseData);
      } catch (error) {
        console.error('목표가 조회 실패', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (priceData.length > 0) {
      const dateList: string[] = ['1', '2', '3', '4', '5'];

      priceData.map((item, index) => {
        const chartRef = chartRefs.current[index];
        const onlineList = item.online_price;
        const offlineList = item.offline_price;
        const myList = Array.from({ length: dateList.length }, () => item.target_price);

        const data = {
          labels: dateList,
          datasets: [
            {
              label: '온라인',
              borderColor: 'rgb(135, 135, 255)',
              data: onlineList.reverse(),
            },
            {
              label: '오프라인',
              borderColor: 'rgb(240, 106, 106)',
              data: offlineList.reverse(),
            },
            {
              label: '목표가',
              borderColor: '#02a57b',
              data: myList,
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
              display: true,
              labels: {
                font: {
                  size: 10,
                },
              },
            },
          },
        } as const;

        if (chartRef) {
          const newChart = new Chart(chartRef, {
            type: 'line',
            data: data,
            options: options,
          });
          return newChart;
        } else {
          return null;
        }
      });

      // setMyLineCharts(newCharts.filter((chart) => chart !== null) as Chart<'line'>[]);
    }
  }, [priceData]);

  const navigate = useNavigate();
  const onClickDetail = (ingredient_id: number) => {
    navigate(`/ingredient/report/${ingredient_id}`);
  };
  return (
    <div>
      {priceData.length === 0 ? (
        <Message>지정한 목표가가 없습니다</Message>
      ) : (
        priceData.map((item, index) => (
          <Container key={index}>
            <ChartContainer>
              <canvas ref={(ref) => (chartRefs.current[index] = ref)}></canvas>
            </ChartContainer>
            <Context onClick={() => onClickDetail(item.ingredient_id)}>
              <Ingredient>{item.ingredient_name}</Ingredient>
              <OnlinePrice>{item.current_online_price.toLocaleString('ko-KR')}원</OnlinePrice>
              <OfflinePrice>{item.current_offline_price.toLocaleString('ko-KR')}원</OfflinePrice>
            </Context>
          </Container>
        ))
      )}
    </div>
  );
}

export default MyPriceList;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

export const ChartContainer = styled.div`
  font-family: 'NanumSquareRoundB';
  border: 1px solid lightgrey;
  height: 150px;
  max-width: 300px;
  margin-left: 0.5rem;
`;

export const OnlinePrice = styled.div`
  font-family: 'NanumSquareRoundB';
  white-space: wrap;
  font-size: medium;
  color: rgb(135, 135, 255);
  margin-left: 3px;
`;

export const OfflinePrice = styled.div`
  font-family: 'NanumSquareRoundB';
  white-space: wrap;
  font-size: medium;
  color: rgb(240, 106, 106);
  margin-left: 3px;
`;

export const Ingredient = styled.div`
  font-family: 'NanumSquareRoundB';
  white-space: wrap;
  font-size: large;
  color: black;
  margin-left: 1px;
  margin-bottom: 1px;
  text-align: center;
`;

export const Context = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 3px;
`;

export const Ratio = styled.div``;

const Message = styled.div`
font-family: 'NanumSquareRoundB';
margin: 1rem;
margin-top: 2rem;
text-align: center;
`;
