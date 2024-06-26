import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import heart_on from '../../assets/images/heart_on.png';
import IconBox from '../common/IconBox';
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

function UserReviewList() {
  // 작성한 리뷰 목록 요청
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewListLoading, setReviewListLoading] = useState(true);
  const [reviewListData, setReviewListData] = useState<Review[] | null>(null);

  const moveToDetail = (recipe_id: number, review_id: number) => {
    navigate(`/recipe/${recipe_id}/review/${review_id}`, {
      state: { reviewId: review_id },
    });
  };

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const response = await api.get(`/recipe-service/v1/reviews/members/${id}`);
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
            <HeaderArea>
              <h6>{review.title}</h6>
              <InfoArea>
                <LikeArea>
                  <img src={heart_on} alt="좋아요" style={{ width: '12px' }} />
                  <span>{review.likes}</span>
                </LikeArea>
              </InfoArea>
            </HeaderArea>
            <ContentsArea>{review.created_at}</ContentsArea>
          </ReviewBox>
        </ReviewContainer>
      ))}
    </div>
  );
}

export default UserReviewList;

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
  grid-template-rows: 2fr 1fr;
`;

const HeaderArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: auto;
  font-family: 'NanumSquareRoundB';
`;

const LikeArea = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ContentsArea = styled.div`
  font-family: 'NanumSquareRoundEB';
  font-size: 12px;
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
