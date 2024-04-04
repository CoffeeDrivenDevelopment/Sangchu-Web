import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

type PriceInfoProps = {
  message?: string;
  body: PriceInfoBodyProps;
};

type PriceInfoBodyProps = {
  img: string;
  type: string;
  content: Array<string>;
};

// 농수산물 분석 페이지 - 가격 변동 정보 조회
async function getPriceInfo(id: number): Promise<PriceInfoBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.INFO, { id: id });
    const response = await api.get<PriceInfoProps>(resultUrl);
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

export default getPriceInfo;

// import dummy from './getPriceInfo.json';
// async function getPriceInfo(id: number) {
//   console.log(id);
//   return dummy.body;
// }

// export default getPriceInfo;
