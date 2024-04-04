import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type ResponseProps = {
  message: string;
  body: ReviewsProps;
};

type ReviewsProps = {
  reviews: ReviewProps[];
  total_count: number;
  last: number;
  has_more: boolean;
};

type ReviewProps = {
  id: number;
  title: string;
  content: string;
  image: string;
  like_count: number;
  is_liked: boolean;
  member: MemberProps;
};

type SearchParams = {
  recipe_id: number;
  last: number;
  size: number;
  // sort: number;
};

async function getReviewList(params: SearchParams): Promise<ReviewsProps | null> {
  const { recipe_id, last, size } = params;
  try {
    const response = await api.get<ResponseProps>(buildUrl(API_PATH.RECIPE.REVIEW, { recipe_id }, { last, size }));
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

export default getReviewList;

// import dummy from './getReviewList.json';

// async function getReviewList() {
//   return dummy.body;
// }

// export default getReviewList;
