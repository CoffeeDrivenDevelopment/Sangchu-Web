import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

// 농수산물 상세 페이지 조회(이름, 구매요령, 이미지)
async function getIngredientDetail(ingredientId: number): Promise<IngredientDetailBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.INGREDIENT.DETAIL, { id: ingredientId });
    const response = await api.get<IngredientDetailProps>(resultUrl);
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

export default getIngredientDetail;

// import dummy from './getIngredientDetail.json';
// async function getIngredientDetail(id: number) {
//   console.log(id);
//   return dummy.body;
// }

// export default getIngredientDetail;
