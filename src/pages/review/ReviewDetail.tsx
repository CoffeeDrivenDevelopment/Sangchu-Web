import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Carousel from 'react-material-ui-carousel';
import { useLocation, useNavigate } from 'react-router-dom';
// import heart_off from '../../assets/images/heart_off.png';
// import heart_on from '../../assets/images/heart_on.png';
import { Gray, LightGray, main } from '../../assets/styles/palettes';
import { FlexRowBox } from '../../components/common/FlexRowBox';
import MainButton from '../../components/common/MainButton';
import EmptyData from '../../components/common/EmptyData';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import getReviewDetail from '../../services/review/getReviewDetail';
// import deleteReviewLike from '../../services/review/deleteReviewLike';
// import postReviewLike from '../../services/review/postReviewLike';
import deleteReview from '../../services/review/deleteReview';
import Swal from 'sweetalert2';

function ReviewDetail() {
  const location = useLocation();
  const reviewId = location.state.reviewId;
  const navigate = useNavigate();
  const member_id = Number(localStorage.getItem('member_id'));

  // const handleLike = useCallback((reviewId: number) => {
  //   postReviewLike(reviewId);
  //   alert('좋아요 추가 완료!');
  // }, []);

  // const handleDislike = useCallback((reviewId: number) => {
  //   deleteReviewLike(reviewId);
  //   alert('좋아요 삭제 완료!');
  // }, []);

  // const queryClient = useQueryClient();
  // const handleLike = async (reviewId: number) => {
  //   try {
  //     // await postReviewLike(reviewId);
  //     alert('좋아요 추가 완료!');
  //     queryClient.invalidateQueries({ queryKey: ['get-reviewDetail', reviewId] });
  //   } catch (error) {
  //     console.error(error);
  //     alert('좋아요 추가에 실패했습니다.');
  //   }
  // };

  // const handleDislike = async (reviewId: number) => {
  //   try {
  //     // await deleteReviewLike(reviewId);
  //     alert('좋아요 삭제 완료!');
  //     queryClient.invalidateQueries({ queryKey: ['get-reviewDetail', reviewId] });
  //   } catch (error) {
  //     console.error(error);
  //     alert('좋아요 삭제에 실패했습니다.');
  //   }
  // };

  const { isLoading: detailLoading, data: detailData } = useQuery({
    queryKey: ['get-reviewDetail', reviewId],
    queryFn: () => (reviewId !== null ? getReviewDetail(reviewId) : Promise.reject(new Error('ID is null'))),
  });

  const handleDelete = async () => {
    Swal.fire({
      text: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      confirmButtonColor: '#ff4444',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: '삭제 완료!',
          icon: 'success',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '닫기',
          cancelButtonColor: main,
        });
        await deleteReview(reviewId);
        navigate(-1);
      }
    });
  };

  // useEffect(() => {
  //   console.log('좋아요 변화')
  // }, [handleLike, handleDislike]);

  if (detailLoading) return <LoadingSpinner />;
  if (!detailData) return <EmptyData />;
  return (
    <div>
      <Header name={detailData.recipe_name} />
      <MainBox>
        <ContentsBox>
          <HeaderBox>
            <FlexRowBox $alignItems="center" $gap="1vh" $position="relative">
              {/* {detailData.is_liked ? (
                <img src={heart_on} style={{ width: '28px' }} onClick={() => handleDislike(reviewId)} />
              ) : (
                <img src={heart_off} style={{ width: '28px' }} onClick={() => handleLike(reviewId)} />
              )} */}
              <h5>{detailData.title}</h5>
              {/* <CountText>{detailData.like_count}</CountText> */}
            </FlexRowBox>
            <NameText onClick={() => navigate(`/profile/${detailData.member.id}`)}>
              {detailData.member.nickname} 작성
            </NameText>
          </HeaderBox>

          <Carousel
            indicators={false}
            swipe={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
              style: { opacity: '50%', margin: '0 8px', padding: '3px' },
            }}
            navButtonsWrapperProps={{
              style: {
                position: 'absolute',
                top: '50%',
                transform: 'translate(0%, -50%)',
              },
            }}
          >
            {detailData.images.map((image, i) => (
              <div key={i}>
                <ImgBox src={image} />
              </div>
            ))}
          </Carousel>
          <ContentText>{detailData.content}</ContentText>
        </ContentsBox>

        {member_id === detailData.member.id ? (
          <ButtonBox>
            <MainButton text="삭제" backgroundColor={LightGray} textColor="black" onClick={handleDelete} />
          </ButtonBox>
        ) : null}
        
      </MainBox>
    </div>
  );
}

export default ReviewDetail;

const ImgBox = styled.img`
  width: 85vw;
  height: 35vh;
  border-radius: 10px;
`;

const MainBox = styled.div`
  padding: 2.5vh;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${LightGray};
  font-size: 14px;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

const HeaderBox = styled.div`
  padding: 1vh 0;
`;

const ButtonBox = styled.div`
  padding: 2vh 0;
  text-align: right;
`;

const NameText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 13px;
  color: ${Gray};
  text-align: end;
  word-break: keep-all;
`;

const ContentText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 15px;
  padding-bottom: 1.5vh;
  word-break: keep-all;
`;

// const CountText = styled.div`
//   font-family: 'NanumSquareRoundB';
//   position: absolute;
//   top: 3.2vh;
//   left: 9px;
// `;
