import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

type ReasonablePriceProps = {
  message?: string;
  body: ReasonablePriceBodyProps;
};

type ReasonablePriceBodyProps = {
  name: string;
  price: number;
  diff: number;
  img: string;
};

// 농수산물 분석 페이지 - 적정 소비 금액 조회
async function getReasonablePrice(id: number): Promise<ReasonablePriceBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.RESONABLE, { id });
    const response = await api.get<ReasonablePriceProps>(resultUrl);
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

export default getReasonablePrice;

// import dummy from './getReasonablePrice.json';
// async function getReasonablePrice(id: number) {
//   console.log(id);
//   return dummy.body;
// }

// export default getReasonablePrice;
