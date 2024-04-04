import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

async function postRecipeLike(recipe_id: number): Promise<LikeProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.LIKE, { recipe_id });
    const response = await api.post(resultUrl);
    if (response.status !== 201) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default postRecipeLike;
