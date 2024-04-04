import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type ResponseProps = {
  message: string;
  body: ReviewProps;
};

type ReviewProps = {
  review_id: number;
};

async function postReviewRegister(recipe_id: number, formData: FormData): Promise<ReviewProps | null> {
  try {
    console.log('formData 확인!', [...formData.entries()]);
    const resultUrl = buildUrl(API_PATH.RECIPE.REVIEW, { recipe_id });
    const response = await api.post<ResponseProps>(resultUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 201) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default postReviewRegister;
