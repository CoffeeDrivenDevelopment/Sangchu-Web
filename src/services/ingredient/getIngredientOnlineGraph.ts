import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

// 농수산물 상세 페이지의 온라인 최저가 그래프 조회
async function getIngredientOnlineGraph(id: number): Promise<IngredientGraphBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.GRAPH.ONLINE, { id });
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

export default getIngredientOnlineGraph;

// import dummy from './getIngredientOnlineGraph.json';
// async function getIngredientOnlineGraph(ingredientId: number) {
//   console.log(ingredientId);
//   return dummy.body;
// }

// export default getIngredientOnlineGraph;
