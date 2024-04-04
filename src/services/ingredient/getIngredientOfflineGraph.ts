import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

// 농수산물 상세 페이지의 오프라인 최저가 그래프 조회
async function getIngredientOfflineGraph(
  id: number,
  lat: number,
  lng: number,
): Promise<IngredientGraphBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.GRAPH.OFFLINE, { id }, { lat, lng });
    const response = await api.get<IngredientGraphProps>(resultUrl);
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

export default getIngredientOfflineGraph;

// import dummy from './getIngredientOfflineGraph.json';
// async function getIngredientOfflineGraph(ingredientId: number) {
//   console.log(ingredientId);
//   return dummy.body;
// }

// export default getIngredientOfflineGraph;
