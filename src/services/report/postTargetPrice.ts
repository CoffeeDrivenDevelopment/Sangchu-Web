import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

type setPriceProps = {
  message?: string;
  body: null;
};

// 농수산물 분석 페이지 - 목표가 설정
async function postTargetPrice(myTargetPrice: { id: number; price: number }): Promise<setPriceProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.TARGET_PRICE, { id: myTargetPrice.id });
    const response = await api.post<setPriceProps>(resultUrl, { 'target-price': myTargetPrice.price });
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postTargetPrice;

// import dummy from './postTargetPrice.json';
// async function postTargetPrice(myTargetPrice: { id: number; price: number }) {
//   console.log(myTargetPrice.id);
//   console.log(myTargetPrice.price);
//   return dummy.body;
// }

// export default postTargetPrice;
