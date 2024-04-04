import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

// 레시피 댓글(만) 조회
async function getRecipeComments(id: number, last: number, size: number): Promise<CommentsBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.COMMENTS, { recipe_id: id }, { last: last, size: size });
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

export default getRecipeComments;

// import dummy from './getRecipeComments.json';
// async function getRecipeComments(id: number, last: number, size: number) {
//   console.log(id);
//   console.log(last);
//   console.log(size);
//   return dummy.body;
// }

// export default getRecipeComments;
