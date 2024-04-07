// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getReviewList from '../../services/review/getReviewList';
import IconBox from '../common/IconBox';
// import { main, LightGray } from '../../assets/styles/palettes';
// import heart from '../../assets/images/heart_on.png';
// import MainButton from '../common/MainButton';
import writeImg from '../../assets/images/reviewWrite.png';
import arrowImg from '../../assets/images/right_arrow.png';
import * as S from './ReviewList.styled';
import EmptyData from '../common/EmptyData';
import LoadingSpinner from '../common/LoadingSpinner';

type ParameterProps = {
  recipeName: string;
  recipeId: number;
};

function ReviewList(props: ParameterProps) {
  const { recipeName, recipeId } = props;
  // const [sort, setSort] = useState<number>(0);
  const navigate = useNavigate();

  // const latestOrder = () => {
  //   setSort(0);
  // };

  // const popularOrder = () => {
  //   setSort(1);
  // };

  const moveToWrite = () => {
    navigate('review/write', {
      state: {
        name: recipeName,
        id: recipeId,
      },
    });
  };

  const moveToDetail = (id: number) => {
    navigate(`review/${id}`, {
      state: {
        reviewId: id,
        name: recipeName,
      },
    });
  };

  const { isLoading: reviewListLoading, data: reviewListData } = useQuery({
    queryKey: ['review-list'],
    queryFn: () =>
      getReviewList({
        recipe_id: recipeId,
        last: Math.pow(2, 31) - 1,
        size: 20,
      }),
  });

  if (reviewListLoading) {
    return <LoadingSpinner />;
  }

  if (!reviewListData) return <EmptyData />;

  return (
    <div>
      <S.SubHeader>
        {/* sort === 0 ? (
          <S.FilterArea>
            <div onClick={() => latestOrder()}>
              <MainButton text="최신순" backgroundColor={main} />
            </div>
            <div onClick={() => popularOrder()}>
              <MainButton text="인기순" backgroundColor={LightGray} textColor="black" />
            </div>
          </S.FilterArea>
        ) : (
          <S.FilterArea>
            <div onClick={() => latestOrder()}>
              <MainButton text="최신순" backgroundColor={LightGray} textColor="black" />
            </div>
            <div onClick={() => popularOrder()}>
              <MainButton text="인기순" backgroundColor={main} />
            </div>
          </S.FilterArea>
        ) */}
        <S.ReviewWriteBtn onClick={() => moveToWrite()}>
          <img src={writeImg} alt="리뷰 작성" style={{ width: '23px' }} />
          <span>리뷰 작성</span>
          <img src={arrowImg} alt="화살표" style={{ width: '16px' }} />
        </S.ReviewWriteBtn>
      </S.SubHeader>
      {reviewListData.reviews.length === 0 ? <S.EmptyBox>첫 리뷰를 작성해보세요!</S.EmptyBox> : null}

      {reviewListData.reviews.map((review) => (
        <S.ReviewContainer key={review.id} onClick={() => moveToDetail(review.id)}>
          <IconBox text="" img={review.image} />
          <S.ReviewBox>
            <S.HeaderArea>
              <S.TitleText>{review.title}</S.TitleText>
              <S.InfoArea>
                <S.Writer>by {review.member.nickname}</S.Writer>
                {/* <S.LikeArea>
                  <img src={heart} alt="좋아요" style={{ width: '12px' }} />
                  <span>{review.like_count}</span>
                </S.LikeArea> */}
              </S.InfoArea>
            </S.HeaderArea>
            <S.ContentsArea>{review.content}</S.ContentsArea>
          </S.ReviewBox>
        </S.ReviewContainer>
      ))}
    </div>
  );
}

export default ReviewList;
