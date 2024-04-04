import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

// 농수산물 분석 페이지 - 온라인 가격 상세 조회(그래프)
async function getOnlineGraph(id: number): Promise<ReportGraphBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.ONLINE, { id });
    const response = await api.get<ReportGraphProps>(resultUrl);
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getOnlineGraph;
