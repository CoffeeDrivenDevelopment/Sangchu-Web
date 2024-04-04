import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

type TargetPriceProps = {
  message?: string;
  body: TargetPriceBodyProps;
};

type TargetPriceBodyProps = {
  targets: TargetProps[];
  targetPrice: number;
};

type TargetProps = {
  price: number;
  cnt: number;
};
// 농수산물 분석 페이지 - 목표가 조회
async function getTargetPrice(id: number): Promise<TargetPriceBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.TARGET_PRICE, { id });
    const response = await api.get<TargetPriceProps>(resultUrl);
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

export default getTargetPrice;

// import dummy from './getTargetPrice.json';
// async function getTargetPrice(id: number, price: number | null) {
//   console.log(id);
//   console.log(price);
//   return dummy.body;
// }

// export default getTargetPrice;
