import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

async function deleteReview(review_id: number) {
  try {
    const response = await api.delete(buildUrl(API_PATH.RECIPE.REVIEW_RUD, { review_id }));
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default deleteReview;
