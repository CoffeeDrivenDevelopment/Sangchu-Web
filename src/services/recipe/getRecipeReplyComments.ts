import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';
import api from '../../api/api';

// 레시피 대댓글(만) 조회
async function getRecipeReplyComments(id: number, last: number, size: number): Promise<CommentsBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.REPLY_COMMENTS, { comment_id: id }, { last: last, size: size });
    const response = await api.get<CommentsProps>(resultUrl);
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

export default getRecipeReplyComments;

// import dummy from './getRecipeReplyComments.json';
// async function getRecipeReplyComments(id: number, last: number, size: number) {
//   console.log(id);
//   console.log(last);
//   console.log(size);
//   return dummy.body;
// }

// export default getRecipeReplyComments;
