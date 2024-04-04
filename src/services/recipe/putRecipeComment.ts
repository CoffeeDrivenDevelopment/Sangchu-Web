import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

type putCommentProps = {
  message?: string;
  body: putCommentBodyProps;
};

type putCommentBodyProps = {
  content: string;
};

// 레시피 댓글 수정
async function putRecipeComment(comment_id: number, content: string): Promise<putCommentBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.COMMENT_UD, { comment_id: comment_id });
    const response = await api.put<putCommentProps>(resultUrl, { content: content });
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default putRecipeComment;

// import dummy from './putRecipeComment.json';
// async function putRecipeComment(comment_id: number, content: string) {
//   console.log(comment_id);
//   console.log(content);
//   return dummy.body;
// }

// export default putRecipeComment;
