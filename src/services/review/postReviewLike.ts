// import API_PATH from '../../constants/path';
// import buildUrl from '../../constants/urlCreater';
// import api from '../api';

// async function postReviewLike(reviewId: number): Promise<LikeProps | null> {
//   try {
//     const resultUrl = buildUrl(API_PATH.RECIPE.REVIEW_LIKE, { review_id: reviewId });
//     const response = await api.post(resultUrl);
//     if (response.status !== 200) {
//       throw new Error(`${response.message}`);
//     }
//     console.log(response.message);
//     return response.body;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export default postReviewLike;
