import styled from '@emotion/styled';
import { TextField, ThemeProvider } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import comment_img from '../../assets/images/comment.png';
import no_profile from '../../assets/images/no_profile.png';
import { main } from '../../assets/styles/palettes';
import { theme } from '../../assets/styles/theme';
import deleteRecipeComment from '../../services/recipe/deleteRecipeComment';
import getRecipeComments from '../../services/recipe/getRecipeComments';
import postRecipeComment from '../../services/recipe/postRecipeComment';
import putRecipeComment from '../../services/recipe/putRecipeComment';
import CommentInput from '../common/CommentInput';
import EmptyData from '../common/EmptyData';
import { FlexColBox } from '../common/FlexColBox';
import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';
import RecipeReplyComments from './RecipeReplyComments';

type RecipeCommentListProps = {
  recipeId: number;
};
type EditContents = {
  [comment_id: number]: string;
};

type ShowReplyState = {
  [key: number]: boolean;
};

// 댓글 조회 및 작성
function RecipeComments({ recipeId }: RecipeCommentListProps) {
  const {
    data: commentsData,
    hasNextPage,
    isLoading: commentsLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['get-recipe-Comments', recipeId],
    queryFn: ({ pageParam }) => getRecipeComments(recipeId, pageParam, 20),
    initialPageParam: 100000000,
    // 다음 페이지 /  총 댓글 수
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.comments.length === 0) return undefined; // 마지막 페이지에 도달했을 때
      return pages.length + 1; // 다음 페이지 번호를 반환
    },
  });
  // const handleScroll = (e: React.UIEvent<HTMLElement>) => {
  //   const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

  //   // 페이지 끝에 도달했는지 확인
  //   if (scrollHeight - scrollTop <= clientHeight * 1.5) {
  //     console.log('바닥침');
  //     if (hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage(); // 다음 페이지 데이터 불러오기
  //     }
  //   }
  // };

  // const queryClient = useQueryClient();
  // const [last, setLast] = useState(1000000);
  // const {
  //   isLoading: commentsLoading,
  //   data: commentsData,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['get-comments'],
  //   queryFn: () => getRecipeComments(recipeId, last, 5),
  //   placeholderData: keepPreviousData,
  // });

  const member_id = Number(localStorage.getItem('member_id'));
  const [content, setContent] = useState('');
  // 각 댓글의 수정 내용
  const [editContents, setEditContents] = useState<EditContents>({});
  // 수정 버튼 클릭 여부
  const [isEdit, setIsEdit] = useState<{ [commentId: number]: boolean }>({});
  const [isShowReply, setIsShowReply] = useState<ShowReplyState>({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (commentsData) {
  //     setLast(commentsData.last);
  //   }
  // });
  // 댓글 더보기 버튼 클릭
  // const handleLoadMore = async () => {
  //   console.log(last);
  //   if (commentsData?.has_more) {
  //     try {
  //       const moreCommentsData = await getRecipeComments(recipeId, last, 5);
  //       if (moreCommentsData) {
  //         queryClient.setQueryData(['get-comments'], (oldData: CommentsBodyProps) => {
  //           return {
  //             ...oldData,
  //             comments: [...oldData.comments, ...moreCommentsData.comments],
  //             has_more: moreCommentsData.has_more,
  //           };
  //         });
  //         setLast(moreCommentsData.last);
  //       }
  //     } catch (error) {
  //       console.error('댓글 더 불러오기 중 에러 발생:', error);
  //     }
  //   }
  // };

  // 댓글 작성 버튼 클릭
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await postRecipeComment(recipeId, content, -1);
    alert('댓글 작성 완료!');
    setContent('');
    refetch();
  };

  // 댓글 수정 - 내용 change
  const handleEditContentChange = (comment_id: number, newContent: string) => {
    setEditContents((prev) => ({
      ...prev,
      [comment_id]: newContent,
    }));
  };

  // 댓글 수정 - 저장 버튼 click
  const handlePutComment = async (comment_id: number) => {
    const content = editContents[comment_id] || '';
    await putRecipeComment(comment_id, content);
    alert('댓글 수정 완료!');
    setIsEdit((prev) => ({
      ...prev,
      [comment_id]: !prev[comment_id],
    }));
    refetch();
  };

  // 수정 버튼 클릭 이벤트 핸들러
  const handleEditClick = (comment_id: number) => {
    setIsEdit((prev) => ({
      ...prev,
      [comment_id]: !prev[comment_id],
    }));
  };

  // 삭제 버튼 클릭 이벤트 핸들러
  const handleDeleteClick = async (comment_id: number) => {
    alert('댓글 삭제 완료!');
    await deleteRecipeComment(comment_id);
    refetch();
  };

  // 대댓글 목록 조회하는 이벤트 함수
  const handleCommentDetail = (comment_id: number) => {
    setIsShowReply((prev) => ({
      ...prev,
      [comment_id]: !prev[comment_id],
    }));
  };

  if (commentsLoading) {
    return <LoadingSpinner />;
  }

  if (!commentsData) {
    return <EmptyData />;
  }
  return (
    <ThemeProvider theme={theme}>
      <MainBox>
        <InputBox>
          <CommentInput onClick={handlePostComment} content={content} setContent={setContent} />
        </InputBox>
        {commentsData.pages.map((group, i) => (
          <div key={i}>
            {group &&
              group.comments.map((comment) => (
                <Balloon key={comment.id}>
                  <FlexColBox $padding="10px">
                    <FlexRowBox
                      $alignItems="center"
                      $gap="5px"
                      onClick={() => navigate(`/profile/${comment.member.id}`)}
                    >
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

                    {/*수정 버튼을 눌렀을 경우*/}
                    {isEdit[comment.id] ? (
                      <FlexColBox $alignItems="flex-end">
                        <TextField
                          sx={{
                            width: '100%',
                            '.MuiInputBase-input': {
                              color: 'white',
                              height: 60,
                              wordBreak: 'keep-all',
                              fontFamily: 'NanumSquareRoundB',
                              padding: '10px',
                            },
                          }}
                          color="primary"
                          multiline
                          maxRows={4}
                          variant="standard"
                          onChange={(e) => handleEditContentChange(comment.id, e.target.value)}
                          value={editContents[comment.id] !== undefined ? editContents[comment.id] : comment.content}
                        />
                        <SaveButton onClick={() => handlePutComment(comment.id)}>저장</SaveButton>
                      </FlexColBox>
                    ) : (
                      <div
                        style={{ padding: '10px', wordBreak: 'keep-all' }}
                        onClick={() => handleCommentDetail(comment.id)}
                      >
                        {comment.content}
                      </div>
                    )}

                    <FlexRowBox $position="absolute" $alignItems="center" $right="10px" $gap="5px">
                      <SubText>{comment.last_updated_time} |</SubText>

                      {member_id === comment.member.id ? (
                        <FlexRowBox $gap="0.5vh">
                          <SubText onClick={() => handleEditClick(comment.id)}>수정</SubText>
                          <SubText>|</SubText>
                          <SubText onClick={() => handleDeleteClick(comment.id)}>삭제</SubText>
                        </FlexRowBox>
                      ) : null}

                      <FlexRowBox $alignItems="center" $gap="3px">
                        <img src={comment_img} style={{ width: '15px', height: '15px' }} />
                        <SubText>{comment.reply_count}</SubText>
                      </FlexRowBox>
                    </FlexRowBox>
                  </FlexColBox>

                  {/* 대댓글 보기 */}
                  {isShowReply[comment.id] && <RecipeReplyComments parent_commentId={comment.id} recipeId={recipeId} />}
                </Balloon>
              ))}
          </div>
        ))}
        {isFetchingNextPage && <div>댓글 불러오는 중...</div>}
        {!hasNextPage && <p>마지막</p>}

        {/* {commentsData.has_more && (
          <FlexColBox $alignItems="center" $padding="5px">
            <MainButton text="더보기" padding="3px" onClick={handleLoadMore} />
          </FlexColBox>
        )} */}
      </MainBox>
    </ThemeProvider>
  );
}

export default RecipeComments;

const Balloon = styled.div`
  position: relative;
  background: ${main};
  border-radius: 10px;
  margin: 10px 25px 10px 15px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);

  ::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    border: 19px solid transparent;
    border-left-color: ${main};
    border-right: 0;
    border-bottom: 0;
    margin-top: -9.5px;
    margin-right: -16px;
  }
`;

const SubText = styled.div`
  font-size: 12px;
`;

const MainBox = styled.div`
  font-family: 'NanumSquareRoundB';
  color: white;
  overflow-y: 'auto';
  height: 100%;
`;
const InputBox = styled(FlexColBox)`
  align-items: center;
  margin: 1vh 3vw 0 3vw;
`;

const SaveButton = styled.div`
  margin-top: 1vh;
  display: inline-flex;
  padding: 2px;
`;
