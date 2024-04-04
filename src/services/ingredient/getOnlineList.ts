import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

type OnlineMarketListProps = {
  message?: string;
  body: OnlineMarketListBodyProps;
};

type OnlineMarketListBodyProps = {
  markets: OnlineMarketsProps[];
};
// 농수산물 상세 페이지의 온라인 마켓들 목록 조회
async function getOnlineList(id: number): Promise<OnlineMarketListBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.MARKET.ONLINE, { id: id });
    const response = await api.get<OnlineMarketListProps>(resultUrl);
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

export default getOnlineList;

// import dummy from './getOnlineList.json';
// async function getOnlineList(id: number) {
//   console.log(id);
//   return dummy.body;
// }

// export default getOnlineList;
