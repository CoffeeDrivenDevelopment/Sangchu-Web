import api from '../../api/api';
import API_PATH from '../../constants/path';

type postRecipeCommentBodyProps = {
  message?: string;
  body: CommentProps;
};
// 레시피 댓글 작성
async function postRecipeComment(
  recipe_id: number,
  content: string,
  comment_id?: number,
): Promise<CommentProps | null> {
  try {
    const response = await api.post<postRecipeCommentBodyProps>(API_PATH.RECIPE.COMMENT_C, {
      recipe_id: recipe_id,
      parent_comment_id: comment_id,
      content: content,
    });
    if (response.status !== 201) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default postRecipeComment;

// import dummy from './postRecipeComment.json';
// async function postRecipeComment(id: number, content: string, comment_id?: number) {
//   console.log(id);
//   console.log(comment_id);
//   console.log(content);
//   return dummy.body;
// }

// export default postRecipeComment;
