import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

type DeleteCommentProps = {
  message?: string;
  body: ContentProps;
};

type ContentProps = {
  content: string;
};

// 레시피 댓글 삭제
async function deleteRecipeComment(comment_id: number): Promise<ContentProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.COMMENT_UD, { comment_id: comment_id });
    const response = await api.delete<DeleteCommentProps>(resultUrl);
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

export default deleteRecipeComment;

// import dummy from './deleteRecipeComment.json';
// async function deleteRecipeComment(comment_id: number) {
//   console.log(comment_id);
//   return dummy.body;
// }

// export default deleteRecipeComment;
