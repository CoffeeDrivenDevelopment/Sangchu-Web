import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

type OfflineMarketListProps = {
  message?: string;
  body: OfflineMarketListBodyProps;
};

type OfflineMarketListBodyProps = {
  markets: OfflineMarketsProps[];
};

// 농수산물 상세 페이지의 오프라인 마켓들 목록 조회
async function getOfflineList(id: number, lat: number, lng: number): Promise<OfflineMarketListBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.MARKET.OFFLINE, { id }, { lat, lng });
    const response = await api.get<OfflineMarketListProps>(resultUrl);
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getOfflineList;

// import dummy from './getOfflineList.json';
// async function getOfflineList(id: number) {
//   console.log(id);
//   return dummy.body;
// }

// export default getOfflineList;
