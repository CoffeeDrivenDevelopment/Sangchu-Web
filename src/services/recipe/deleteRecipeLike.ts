import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

async function deleteRecipeLike(recipe_id: number): Promise<LikeProps | null> {
  try {
    const response = await api.delete(buildUrl(API_PATH.RECIPE.LIKE, { recipe_id }));
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default deleteRecipeLike;
