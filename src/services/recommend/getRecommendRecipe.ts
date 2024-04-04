import API_PATH from '../../constants/path';
import api from '../../api/api';

// 메인 페이지의 추천 레시피 조회(1개)
async function getRecommendRecipe(): Promise<RecommendRecipeBodyProps | null> {
  try {
    const response = await api.get<RecommendRecipeProps>(API_PATH.RECOMMEND.RECIPE);
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

export default getRecommendRecipe;

// import dummy from './getRecommendRecipe.json';
// async function getRecommendRecipe() {
//   return dummy.body;
// }

// export default getRecommendRecipe;
