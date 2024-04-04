import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type ResponseProps = {
  message?: string;
  body: ReviewDetailProps;
};

type ReviewDetailProps = {
  id: number;
  title: string;
  content: string;
  images: string[];
  like_count: number;
  is_liked: boolean;
  member: MemberProps;
  recipe_name: string;
};

async function getReviewDetail(review_id: number): Promise<ReviewDetailProps | null> {
  try {
    const response = await api.get<ResponseProps>(buildUrl(API_PATH.RECIPE.REVIEW_RUD, { review_id }));
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

export default getReviewDetail;
