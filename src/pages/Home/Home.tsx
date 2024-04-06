import Paper from '@mui/material/Paper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link, useNavigate } from 'react-router-dom';
import cook from '../../assets/images/cook.png';
import no_image from '../../assets/images/no_image.png';
import notification_off from '../../assets/images/notification_off.png';
import EmptyData from '../../components/common/EmptyData';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';
import HomeBox from '../../components/common/HomeBox';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import LogoWithText from '../../components/common/LogoWithText';
import getRecommendIngredients from '../../services/recommend/getRecommendIngredients';
import getRecommendRecipe from '../../services/recommend/getRecommendRecipe';
import * as S from './Home.styled';
// import notification_on from '../assets/images/notification_on.png';
// 추후 알림 on/off 별로 아이콘 다르게 할 것

function Home() {
  const { isLoading: ingredientsLoading, data: ingredientsData } = useQuery({
    queryKey: ['get-ingredients'],
    queryFn: () => getRecommendIngredients(),
    placeholderData: keepPreviousData,
  });

  const { isLoading: recipeLoading, data: recipeData } = useQuery({
    queryKey: ['get-recipe'],
    queryFn: () => getRecommendRecipe(),
  });

  if (ingredientsLoading || recipeLoading) {
    return <LoadingSpinner />;
  }
  if (!ingredientsData || !recipeData) {
    return <EmptyData />;
  }
  return (
    <div>
      <S.Header>
        <LogoWithText />
        <img src={notification_off} style={{ width: '33px', height: '30px' }} />
      </S.Header>
      <div>
        {/* react-carousel로 추천 재료들 조회 */}
        <Carousel
          indicators={false}
          swipe={false}
          navButtonsAlwaysVisible={true}
          navButtonsProps={{
            style: { opacity: '50%', margin: '0 12px', padding: '2px' },
          }}
          navButtonsWrapperProps={{
            style: {
              position: 'absolute',
              top: '28%',
              transform: 'translate(0%, -50%)',
            },
          }}
        >
          {ingredientsData.ingredients.map((ingredient, i) => (
            <Ingredients key={i} ingredient={ingredient.ingredients} updateAt={ingredientsData.updateAt} />
          ))}
        </Carousel>

        {/* 추천 레시피 조회 */}
        <Recipe recipe={recipeData.recipe} cookingMovie={recipeData['cooking-movies'][0]} />
      </div>
    </div>
  );
}
export default Home;

// 'M/DD' 형식으로 변환해주는 함수
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

// 추천 재료들 데이터 가져오는 함수
function Ingredients({ ingredient, updateAt }: RecommendIngredientFuncProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const onlineList: number[] = [];
  const offlineList: number[] = [];
  const dateList: string[] = [];

  for (let i = 0; i < ingredient.online.length; i++) {
    onlineList.push(ingredient.online[i].price);
  }
  for (let i = 0; i < ingredient.offline.length; i++) {
    offlineList.push(ingredient.offline[i].price);
    dateList.push(formatDate(ingredient.offline[i].date));
  }
  const navigate = useNavigate();
  const handleIngredientClick = (ingredient_id: number) => {
    navigate(`/ingredient/${ingredient_id}`);
  };
  // 차트 데이터 가져오기
  useEffect(() => {
    const data = {
      labels: dateList.reverse(),
      datasets: [
        {
          label: '온라인 최저가',
          borderColor: 'rgb(135, 135, 255)',
          data: onlineList,
        },
        {
          label: '오프라인 최저가',
          borderColor: 'rgb(240, 106, 106)',
          data: offlineList,
        },
      ],
    };

    const options = {
      responsive: false,
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
        },
        y: {
          type: 'linear',
          position: 'left',
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    } as const;

    if (chartRef.current) {
      const myLineChart = new Chart(chartRef.current, {
        type: 'line',
        data: data,
        options: options,
      });
      return () => myLineChart.destroy();
    }
  });

  const image = ingredient.img ? ingredient.img : no_image;

  return (
    <HomeBox height={370}>
      <Paper elevation={3}>
        <S.ContentBox onClick={() => handleIngredientClick(ingredient.id)}>
          <S.TitleText>{ingredient.name}</S.TitleText>
          <FlexRowBox $margin="1vh 0 0 0" $justifyContent="center">
            <FlexRowBox $gap="6vw">
              <Paper
                elevation={3}
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '40vw',
                  height: '16vh',
                  position: 'relative',
                }}
              />

              <FlexColBox $gap="10px" $alignItems="center" $justifyContent="center">
                <FlexColBox $alignItems="center">
                  <S.PriceTitleText>현재 온라인 최저가</S.PriceTitleText>
                  <S.TodayPriceText>{onlineList[5]}원</S.TodayPriceText>
                </FlexColBox>
                <FlexColBox $alignItems="center">
                  <S.PriceTitleText>현재 오프라인 최저가</S.PriceTitleText>
                  <S.TodayPriceText style={{ color: 'rgb(240, 106, 106)' }}>{offlineList[5]}원</S.TodayPriceText>
                </FlexColBox>
              </FlexColBox>
            </FlexRowBox>
          </FlexRowBox>
          <S.UpdateText>{updateAt} 기준</S.UpdateText>
        </S.ContentBox>
        <S.SubTitleText>온/오프라인 최저가</S.SubTitleText>
        <div style={{ padding: '1.8vh' }}>
          <canvas ref={chartRef} style={{ width: '88vw', height: '15vh' }}></canvas>
        </div>
      </Paper>
    </HomeBox>
  );
}

// 추천 레시피 가져오는 함수
function Recipe({ recipe, cookingMovie }: RecommendRecipeFuncProps) {
  const image = recipe.img ? recipe.img : no_image;
  function showTags() {
    const tags = recipe.tags.map((tag) => '#' + tag + ' ');
    return tags;
  }
  const navigate = useNavigate();
  const handleRecipeClick = (recipe_id: number) => {
    navigate(`/recipe/${recipe_id}`, {
      state: {
        id: recipe_id,
        name: recipe.name,
        img: recipe.img
      },
    });
  };
  const replaceQuot = (str: string) => {
    return str.replace(/&quot;/g, '"');
  };

  return (
    <div>
      {/* 여기는 오늘의 추천 레시피 기본 정보 */}
      <HomeBox height={200}>
        <Paper elevation={3}>
          <S.ContentBox onClick={() => handleRecipeClick(recipe.id)}>
            <S.TodayRecipeText>오늘의 추천 메뉴는?</S.TodayRecipeText>
            <S.RecipeBox>
              <Paper
                elevation={3}
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '140px',
                  height: '120px',
                }}
              ></Paper>
              <S.RecipeSubBox>
                <S.RecipeText>{recipe.name}</S.RecipeText>
                <S.TagText>{showTags()}</S.TagText>
                <S.ContentText>{recipe.ingredients}</S.ContentText>
              </S.RecipeSubBox>
            </S.RecipeBox>
          </S.ContentBox>
        </Paper>
      </HomeBox>
      {/* 여기부터 추천 레시피 요리 영상 */}
      <HomeBox height={200}>
        <Paper elevation={3}>
          <S.ContentBox>
            <Link to={cookingMovie.url} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
              <FlexRowBox $alignItems="center" $gap="3px">
                <div style={{ marginBottom: '5px' }}>
                  <img src={cook} width={'25vw'} />
                </div>
                <S.TitleText>요리하러 가기</S.TitleText>
              </FlexRowBox>
              <FlexRowBox $alignItems="center">
                <Paper
                  elevation={3}
                  sx={{
                    backgroundImage: `url(${cookingMovie.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '140px',
                    height: '120px',
                    marginTop: '5px',
                  }}
                ></Paper>
                <S.MovieSubBox>
                  <S.MovieTitleText>{replaceQuot(cookingMovie.title)}</S.MovieTitleText>
                  <S.ContentText style={{ textAlign: 'left' }}>{cookingMovie.content}</S.ContentText>
                </S.MovieSubBox>
              </FlexRowBox>
            </Link>
          </S.ContentBox>
        </Paper>
      </HomeBox>
    </div>
  );
}
