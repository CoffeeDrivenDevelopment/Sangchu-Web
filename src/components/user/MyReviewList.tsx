import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import IconBox from '../common/IconBox';
// import heart_on from '../../assets/images/heart_on.png';
import api from '../../api/api';

interface Review {
  review_id: number;
  title: string;
  content: string;
  recipe_id: number;
  image: string;
  created_at: string;
  likes: number;
}

function MyReviewList() {
  const navigate = useNavigate();
  const [reviewListLoading, setReviewListLoading] = useState(true);
  const [reviewListData, setReviewListData] = useState<Review[] | null>(null);

  const moveToDetail = (recipe_id: number, review_id: number) => {
    navigate(`/recipe/${recipe_id}/review/${review_id}`, {
      state: {
        reviewId: review_id,
      },
    });
  };

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const member_id = localStorage.getItem('member_id');
        const response = await api.get(`/recipe-service/v1/reviews/members/${member_id}`);
        console.log('나의 리뷰 조회 성공', response.data.body);
        setReviewListData(response.data.body.reviews);
        setReviewListLoading(false);
      } catch (error) {
        console.log('리뷰 조회 실패', error);
        setReviewListLoading(false);
      }
    };

    getReviewData();
  }, []);

  if (reviewListLoading) return <Message>로딩 중...</Message>;
  if (!reviewListData || reviewListData.length === 0) return <Message>작성한 리뷰글이 없습니다.</Message>;

  return (
    <div>
      <SubHeader></SubHeader>
      {reviewListData.map((review) => (
        <ReviewContainer key={review.review_id} onClick={() => moveToDetail(review.recipe_id, review.review_id)}>
          <IconBox text="" img={review.image} />
          <ReviewBox>
            <ReviewTitle>{review.title}</ReviewTitle>
            {/* <InfoArea>
                <LikeArea>
                  <img src={heart_on} alt="좋아요" style={{ width: '12px' }} />
                  <span>{review.likes}</span>
                </LikeArea>
              </InfoArea> */}
            <ContentsArea>{review.created_at}</ContentsArea>
          </ReviewBox>
        </ReviewContainer>
      ))}
    </div>
  );
}

export default MyReviewList;

const ReviewContainer = styled.div`
  display: grid;
  padding: 1rem;
  column-gap: 1rem;
  grid-template-columns: 1fr 3fr;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ReviewBox = styled.div`
  display: grid;
  grid-template-rows: 6fr 1fr;
`;

// const HeaderArea = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   column-gap: 1rem;
// `;

// const InfoArea = styled.div`
//   display: flex;
//   flex-direction: column;
//   font-size: 12px;
//   margin-left: auto;
//   font-family: 'NanumSquareRoundB';
// `;

// const LikeArea = styled.div`
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
// `;

const ContentsArea = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 12px;
  text-align: right;
`;

const SubHeader = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Message = styled.div`
  font-family: 'NanumSquareRoundB';
  margin: 1rem;
  margin-top: 2rem;
  text-align: center;
`;

const ReviewTitle = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: large;
  padding: 1.5vh 0 0 0.5vh;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* max-width: 200px;
  min-width: 200px; */
`;
