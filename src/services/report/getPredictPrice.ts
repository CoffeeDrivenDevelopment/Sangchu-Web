// import API_PATH from '../../constants/path';
// import buildUrl from '../../constants/urlCreater';
// import api from '../api';

// type ReportPredictProps = {
//   message?: string;
//   body: {
//     weather?: {
//       type: string;
//       day: string;
//     };
//     news?: {
//       keyword: string;
//       url: string;
//     };
//     cost?: {
//       percent: number;
//       price: number;
//     };
//   };
// };

// // 농수산물 분석 페이지 - 예측 가격 조회
// async function getPredictPrice(id: number): Promise<ReportPredictProps | null> {
//   try {
//     const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.PREDICT, { id: { id } });
//     const response = await api.get<ReportPredictProps>(resultUrl);
//     if (response.status !== 200) {
//       throw new Error(`${response.message}`);
//     }
//     console.log(response.message);
//     return response.body;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export default getPredictPrice;

import dummy from './getPredictPrice.json';
async function getPredictPrice(id: number) {
  console.log(id);
  return dummy.body;
}

export default getPredictPrice;
