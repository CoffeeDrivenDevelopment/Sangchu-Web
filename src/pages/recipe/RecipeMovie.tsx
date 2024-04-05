import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import EmptyData from '../../components/common/EmptyData';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';
// import HomeBox from '../../components/common/HomeBox';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import getRecipeMovies from '../../services/recipe/getRecipeMovies';

function RecipeMovie() {
  const location = useLocation();
  const { isLoading: movieLoading, data: movieData } = useQuery({
    queryKey: ['get-movies'],
    queryFn: () => getRecipeMovies(location.state.name),
  });

  // 큰따옴표 깨짐 수정해주는 함수
  const replaceQuot = (str: string) => {
    return str.replace(/&quot;/g, '"');
  };

  if (movieLoading) return <LoadingSpinner />;
  if (!movieData) return <EmptyData />;

  return (
    <div style={{ padding: '2vh' }}>
      <TotalText>총 {movieData.total_count}개</TotalText>
      {movieData.cooking_movies.map((movie, i) => (
        <div key={i}>
          <Link to={movie.url} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
            <Paper elevation={3}>
              <FlexRowBox $alignItems="center">
                <Paper
                  elevation={3}
                  sx={{
                    backgroundImage: `url(${movie.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '140px',
                    height: '120px',
                  }}
                ></Paper>
                <MovieSubBox>
                  <MovieTitleText>{replaceQuot(movie.title)}</MovieTitleText>
                  <ContentText>{movie.content}</ContentText>
                </MovieSubBox>
              </FlexRowBox>
            </Paper>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeMovie;

const TotalText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 13px;
  text-align: right;
  padding: 1vh;
`;

const MovieTitleText = styled.h6`
  width: 50vw;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ContentText = styled.div`
  font-family: 'NanumSquareRoundB';
  font-size: 12px;
  width: 50vw;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MovieSubBox = styled(FlexColBox)`
  padding-left: 1.5vh;
  gap: 1vw;
`;
