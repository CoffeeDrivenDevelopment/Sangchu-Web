import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ImageContainer from '../../components/common/ImageContainer';
import ShortToggleBar from '../../components/common/ShortToggleBar';
import useToggleStore from '../../stores/useToggleStore';
import ReviewList from '../../components/review/ReviewList';
import RecipeComments from './RecipeComments';
import getRecipeDetail from '../../services/recipe/getRecipeDetail';
import LoadingSpinner from '../common/LoadingSpinner';
import * as S from './RecipeInfo.styled.ts';
import { Gray } from '../../assets/styles/palettes';
// import minus from '../../assets/images/minus.png';
// import plus from '../../assets/images/add.png';
import recipe from '../../assets/images/recipeMain.png';
import youtube from '../../assets/images/youtube.png';
import right from '../../assets/images/right_arrow.png';
import EmptyData from '../common/EmptyData.tsx';

function RecipeInfo() {
  // const [statusArray, setStatusArray] = useState<Array<boolean>>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryValue, setCategoryValue } = useToggleStore();

  const { isLoading: recipeDetailLoading, data: recipeDetailData } = useQuery({
    queryKey: ['get-recipe-detail', location.state.id],
    queryFn: () => getRecipeDetail(location.state.id),
  });

  useEffect(() => {
    setCategoryValue(0);
  }, [setCategoryValue]);

  // useEffect(() => {
  //   if (recipeDetailData) {
  //     const ingredientsLength = recipeDetailData.ingredients.length;
  //     const initialStatusArray = Array<boolean>(ingredientsLength).fill(true);
  //     setStatusArray(initialStatusArray);
  //   }
  // }, [recipeDetailData]);

  if (recipeDetailLoading) return <LoadingSpinner />;
  if (!recipeDetailData) return <EmptyData />;

  // const totalPrice = () => {
  //   return recipeDetailData.ingredients.reduce((total, ingredient, idx) => {
  //     if (statusArray[idx]) {
  //       return total + ingredient.price;
  //     }
  //     return total;
  //   }, 0);
  // };

  // const statusChange = (idx: number) => {
  //   const updatedStatusArray = [...statusArray];
  //   updatedStatusArray[idx] = !statusArray[idx];
  //   setStatusArray(updatedStatusArray);
  // };

  const moveToRecipe = () => {
    window.location.href = `https://www.10000recipe.com/recipe/${recipeDetailData.serial_number}`;
  };

  const moveToYoutube = () => {
    navigate('movie', {
      state: {
        id: location.state.id,
        name: location.state.name,
      },
    });
  };

  return (
    <div>
      <ImageContainer photo={location.state.img} />
      <S.InformationContainer>
        <S.IngredientInfo>
          <S.HeaderBox>
            <h6>재료 정보</h6>
            <span style={{ fontSize: '12px', color: `${Gray}` }}>
              {recipeDetailData.food_portion} / {recipeDetailData.cooking_difficulty} / {recipeDetailData.cooking_time}
            </span>
          </S.HeaderBox>
          <S.ContentsBox>
            <span>{recipeDetailData.ingredient}</span>
            {/* {recipeDetailData.ingredients.map((ingredient, idx, array) => (
              <span key={idx}>
                {ingredient.name}
                {idx !== array.length - 1 ? ', ' : ''}
              </span>
            ))} */}
          </S.ContentsBox>
        </S.IngredientInfo>
        {/* <S.IngredientInfo>
          <h6>재료 목록</h6>
          <S.ContentsBox>
            <table>
              <tbody>
                {recipeDetailData.ingredients.map((ingredient, idx) => (
                  <tr key={idx}>
                    <td>{ingredient.name}</td>
                    {statusArray[idx] ? (
                      <td>{ingredient.price}원</td>
                    ) : (
                      <td style={{ textDecoration: 'line-through' }}>{ingredient.price}원</td>
                    )}
                    {statusArray[idx] ? (
                      <td>
                        <img src={minus} alt="minus.png" style={{ width: '20px' }} onClick={() => statusChange(idx)} />
                      </td>
                    ) : (
                      <td>
                        <img src={plus} alt="plus.png" style={{ width: '20px' }} onClick={() => statusChange(idx)} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <h6 style={{ marginLeft: 'auto' }}>합계: {totalPrice()}원</h6>
          </S.ContentsBox>
        </S.IngredientInfo> */}
        <S.LinkBox>
          <S.Link onClick={() => moveToRecipe()}>
            <img src={recipe} alt="레시피 이미지" style={{ width: '30px' }} />
            <span>요리법 보러가기</span>
            <img src={right} alt="화살표 이미지" style={{ width: '20px' }} />
          </S.Link>
          <S.Link onClick={() => moveToYoutube()}>
            <img src={youtube} alt="유튜브 이미지" style={{ width: '30px' }} />
            <span>요리영상 보러가기</span>
            <img src={right} alt="화살표 이미지" style={{ width: '20px' }} />
          </S.Link>
        </S.LinkBox>
      </S.InformationContainer>
      <div style={{ padding: '0 0.8rem' }}>
        <ShortToggleBar labelType="recipe" />
        {categoryValue === 0 ? (
          <ReviewList recipeName={location.state.name} recipeId={location.state.id} />
        ) : (
          <RecipeComments recipeId={location.state.id} />
        )}
      </div>
    </div>
  );
}

export default RecipeInfo;
