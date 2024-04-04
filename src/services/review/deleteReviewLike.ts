// import API_PATH from '../../constants/path';
// import buildUrl from '../../constants/urlCreater';
// import api from '../api';


// async function deleteReviewLike(like_id: number): Promise<LikeProps | null> {
//   try {
//     const response = await api.delete(buildUrl(API_PATH.RECIPE.REVIEW_DISLIKE, {  like_id: { like_id }  }));
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

// export default deleteReviewLike;
