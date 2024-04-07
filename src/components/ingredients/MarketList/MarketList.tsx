import { useQuery } from '@tanstack/react-query';
import { startTransition, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import low_price from '../../../assets/images/low_price.png';
import map_icon from '../../../assets/images/map.png';
import market_icon from '../../../assets/images/market.png';
import online_market from '../../../assets/images/online_market.png';
import getOfflineList from '../../../services/ingredient/getOfflineList';
import getOnlineList from '../../../services/ingredient/getOnlineList';
import EmptyData from '../../common/EmptyData';
import { FlexColBox } from '../../common/FlexColBox';
import { FlexRowBox } from '../../common/FlexRowBox';
import LoadingSpinner from '../../common/LoadingSpinner';
import * as S from './MarketList.styled';
import patchUserAddress from '../../../services/user/patchUserAddress';

function MarketList({ id }: { id: number }) {
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

  const navigate = useNavigate();
  const { isLoading: offlineMarketLoading, data: offlineMarketData } = useQuery({
    queryKey: ['get-OfflineMarket', id],
    queryFn: () =>
      id !== null && myAddress !== null && myAddress.lat !== null && myAddress.lng !== null
        ? getOfflineList(id, myAddress.lat, myAddress.lng)
        : Promise.reject(new Error('ID is null')),
  });

  const { isLoading: onlineMarketLoading, data: onlineMarketData } = useQuery({
    queryKey: ['get-OnlineMarket', id],
    queryFn: () => (id !== null ? getOnlineList(id) : Promise.reject(new Error('ID is null'))),
  });

  const handleMap = (lat: number, lng: number, name: string) => {
    startTransition(() => {
      navigate(`/ingredient/map/${id}`, {
        state: {
          lat,
          lng,
          name,
        },
      });
    });
  };

  console.log(onlineMarketData);
  if (onlineMarketLoading || offlineMarketLoading) {
    return <LoadingSpinner />;
  }

  // if (offlineMarketData?.markets.length === 0 && !onlineMarketData) {
  //   return <EmptyData />;
  // }

  // if (!onlineMarketData) {
  //   return <div>온라인 마켓 데이터가 없음</div>;
  // }

  // 시장들 불러오는 함수
  const renderOfflineMarkets = () => {
    if (offlineMarketData && offlineMarketData.markets.length > 0) {
      const marketList = offlineMarketData.markets.map((market, i) => (
        <div key={i}>
          <FlexRowBox $gap="10px" $alignItems="center" $padding="1vh" $margin="0 0 1vh 0">
            <img src={market_icon} style={{ width: '40px', height: '40px' }} />

            <FlexRowBox $justifyContent="space-between" $alignItems="center" $width="100%">
              <FlexColBox $gap="3px">
                <S.MarketText>{market.name}</S.MarketText>
                <S.MarketText style={{ fontFamily: 'NanumSquareRoundB' }}>
                  {market.price.toLocaleString('ko-KR')}원
                </S.MarketText>
              </FlexColBox>

              <S.MapBox onClick={() => handleMap(market.lat, market.lng, market.name)}>
                <img src={map_icon} style={{ width: '30px', height: '30px' }} />
                <S.MapText>내 위치로부터 {market.dist}km</S.MapText>
              </S.MapBox>
            </FlexRowBox>
          </FlexRowBox>
          <hr style={{ margin: '1vh' }} />
        </div>
      ));
      return <div>{marketList}</div>;
    } else {
      return (
        <div style={{ fontFamily: 'NanumSquareRoundB', fontSize: '12px' }}>
          설정한 위치의 3km이내에서 판매하지 않는 재료예요.
        </div>
      );
    }
  };

  // 온라인 쇼핑몰들 불러오는 함수
  const renderOnlineMarkets = () => {
    if (onlineMarketData && onlineMarketData.markets.length > 0) {
      const marketList = onlineMarketData.markets.map((market, i) => (
        <div key={i}>
          <Link to={market.market_link}>
            <FlexRowBox $gap="1vh" $alignItems="center" $padding="1vh">
              <img src={online_market} style={{ width: '40px', height: '40px' }} />
              <FlexColBox>
                <FlexColBox $gap="3px">
                  <S.MarketText>{market.market_name}</S.MarketText>
                  <S.MarketText style={{ fontFamily: 'NanumSquareRoundB' }}>
                    {market.price.toLocaleString('ko-KR')}원
                  </S.MarketText>
                </FlexColBox>
              </FlexColBox>
            </FlexRowBox>
          </Link>
          <hr style={{ margin: '2vh 1vh' }} />
        </div>
      ));
      return <div>{marketList}</div>;
    } else {
      return <EmptyData />;
    }
  };

  return (
    <div style={{ padding: '0 20px 20px 20px ', position: 'relative' }}>
      <FlexColBox $margin="3vh 0 3vh 0">
        <FlexRowBox $alignItems="center" $gap="3px">
          <img src={low_price} style={{ width: '35px', height: '35px' }} />
          <h6>온라인 최저가</h6>
        </FlexRowBox>
      </FlexColBox>

      {renderOnlineMarkets()}

      <FlexColBox $margin="3vh 0 2vh 0">
        <FlexRowBox $alignItems="center" $gap="3px">
          <img src={low_price} style={{ width: '35px', height: '35px' }} />
          <h6>오프라인 최저가</h6>
        </FlexRowBox>
        <S.SubText>내 주변 시장의 최저가입니다.</S.SubText>
      </FlexColBox>

      {renderOfflineMarkets()}
    </div>
  );
}
export default MarketList;
