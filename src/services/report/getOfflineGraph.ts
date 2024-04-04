import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

// 농수산물 분석 페이지 - 오프라인 가격 상세 조회(그래프)
async function getOfflineGraph(
  id: number,
  lat: number | null,
  lng: number | null,
): Promise<ReportGraphBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.REPORT.OFFLINE, { id }, { lat, lng });
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

export default getOfflineGraph;
