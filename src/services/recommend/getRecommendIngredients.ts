import api from '../../api/api';
import API_PATH from '../../constants/path';

// 메인 페이지의 추천 재료 조회(6개)
async function getRecommendIngredients(): Promise<RecommendIngredientsBodyProps | null> {
  try {
    const response = await api.get<RecommendIngredientsProps>(API_PATH.RECOMMEND.INGREDIENTS);
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

export default getRecommendIngredients;

// import dummy from './getRecommendIngredients.json';
// async function getRecommendIngredients() {
//   return dummy.body;
// }

// export default getRecommendIngredients;
