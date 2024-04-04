import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import no_profile from '../../assets/images/no_profile.png';
import getRecipeReplyComments from '../../services/recipe/getRecipeReplyComments';
import postRecipeComment from '../../services/recipe/postRecipeComment';
import CommentInput from '../common/CommentInput';
import EmptyData from '../common/EmptyData';
import { FlexColBox } from '../common/FlexColBox';
import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';
import MainButton from '../common/MainButton';

type RecipeCommentListProps = {
  recipeId: number;
  parent_commentId: number;
};

// 대댓글 목록 조회 및 작성
function RecipeReplyComments({ recipeId, parent_commentId }: RecipeCommentListProps) {
  const queryClient = useQueryClient();
  const [last, setLast] = useState(1000000);
  const {
    isLoading: replyLoading,
    data: replyData,
    refetch,
  } = useQuery({
    queryKey: ['get-reply', parent_commentId],
    queryFn: () => getRecipeReplyComments(parent_commentId, last, 10)
  });
  const [content, setContent] = useState('');

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await postRecipeComment(recipeId, content, parent_commentId);
    alert('대댓글 작성 완료!');
    setContent('');
    refetch();
  };

  const handleLoadMore = () => {
    if (replyData?.has_more) {
      setLast((oldLast) => oldLast + 1);
      queryClient.invalidateQueries({ queryKey: ['get-reply', last] });
    }
  };
  if (replyLoading) {
    return <LoadingSpinner />;
  }

  if (!replyData) {
    return <EmptyData />;
  }
  console.log(replyData)
  return (
    <div style={{ padding: '8px' }}>
      <InputBox>
        <CommentInput onClick={handlePostComment} content={content} setContent={setContent} />
      </InputBox>
      {replyData.comments.map((comment) => (
        <Balloon key={comment.id}>
          <FlexColBox $padding="10px" $position="relative">
            <FlexRowBox $alignItems="center" $gap="5px">
              {comment.member.profile_image != null ? (
                <img
                  src={comment.member.profile_image}
                  style={{ width: '30px', height: '30px', borderRadius: '10px' }}
                />
              ) : (
                <img src={no_profile} style={{ width: '30px', height: '30px' }} />
              )}
              <div style={{ fontFamily: 'NanumSquareRoundEB' }}>{comment.member.nickname}</div>
            </FlexRowBox>

            <div style={{ padding: '10px', wordBreak: 'keep-all' }}>{comment.content}</div>

            <FlexRowBox $position="absolute" $alignItems="center" $right="10px" $gap="5px">
              <SubText>업데이트: {comment.last_updated_time}</SubText>
            </FlexRowBox>
          </FlexColBox>
        </Balloon>
      ))}
      {replyData.has_more && (
        <FlexColBox $alignItems="center" $padding="5px">
          <MainButton text="더보기" padding="3px" onClick={handleLoadMore} />
        </FlexColBox>
      )}
    </div>
  );
}

export default RecipeReplyComments;

const Balloon = styled.div`
  background: #16c89b;
  border-radius: 10px;
  margin: 10px 15px 10px 13px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
`;

const SubText = styled.div`
  font-size: 12px;
`;

const InputBox = styled(FlexColBox)`
  align-items: center;
  margin: 0 1.5vw;
`;
