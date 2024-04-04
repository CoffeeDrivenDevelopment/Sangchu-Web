import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import getRecipeList from '../../services/recipe/getRecipeList';
import { FlexColBox } from '../common/FlexColBox';
import likeImg from '../../assets/images/recipeLike.png';
import unlikeImg from '../../assets/images/recipeUnlike.png';
import { LightGray } from '../../assets/styles/palettes';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyData from '../common/EmptyData';
import useRecipeCategoryStore from '../../stores/useRecipeCategoryStore';
import postRecipeLike from '../../services/recipe/postRecipeLike';
import deleteRecipeLike from '../../services/recipe/deleteRecipeLike';
import ScrollTopButton from '../common/ScrollTopButton';

const RecipeCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr; /* 여기서 1:2 비율로 컬럼을 설정합니다 */
  align-items: center;
  border-radius: 20px;
  height: 130px;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.1);
`;

const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  padding: 5px;
`;

const ContentsBox = styled.div`
  margin: 0 1rem;
`;

const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 1rem;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: 'NanumSquareRoundB';
  font-size: 11px;
`;

const TagBtn = styled.div`
  background-color: ${LightGray};
  padding: 0.5rem;
  border-radius: 10px;
`;

const ParentDiv = styled.div`
  position: relative;
`;

const LikeDiv = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 3rem;
`;

function RecipeListCard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { categoryName } = useRecipeCategoryStore();
  const { id } = useParams<{ id: string }>();

  const moveToDetail = (id: number, img: string, name: string) => {
    navigate(`/recipe/${id}`, {
      state: {
        id,
        img,
        name,
      },
    });
  };

  const handleLike = async (recipe_id: number) => {
    try {
      await postRecipeLike(recipe_id);
      alert('찜 추가 완료!');
      queryClient.invalidateQueries({ queryKey: ['get-recipe-list'] });
    } catch (error) {
      console.error(error);
      alert('찜 추가에 실패했습니다.');
    }
  };

  const handleDislike = async (recipe_id: number) => {
    try {
      await deleteRecipeLike(recipe_id);
      alert('찜 삭제 완료!');
      queryClient.invalidateQueries({ queryKey: ['get-recipe-list'] });
    } catch (error) {
      console.error(error);
      alert('찜 삭제에 실패했습니다.');
    }
  };

  const { isLoading: recipeListLoading, data: recipeListData } = useQuery({
    queryKey: ['get-recipe-list', id],
    queryFn: () =>
      getRecipeList({
        type: 'category',
        query: categoryName[Number(id) - 1],
        last: 40000,
        size: 10,
      }),
  });

  if (recipeListLoading) return <LoadingSpinner />;
  if (!recipeListData) return <EmptyData />;

  return (
    <FlexColBox $margin="1rem" $gap="1rem">
      {recipeListData.recipes.map((recipe) => (
        <ParentDiv key={recipe.id}>
          {recipe.is_liked ? (
            <LikeDiv>
              <img src={likeImg} alt="좋아요 숟가락" width={'25vw'} onClick={() => handleDislike(recipe.id)} />
            </LikeDiv>
          ) : (
            <LikeDiv>
              <img src={unlikeImg} alt="연한 숟가락" width={'25vw'} onClick={() => handleLike(recipe.id)} />
            </LikeDiv>
          )}
          <RecipeCard onClick={() => moveToDetail(recipe.id, recipe.image, recipe.name)}>
            <ImgBox>
              <img
                src={recipe.image}
                alt="레시피 이미지"
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
            </ImgBox>
            <ContentsBox>
              <HeaderBox>
                <h4>{recipe.name}</h4>
                <span></span>
              </HeaderBox>
              <TagBox>
                {recipe.tags.map((tag) => (
                  <TagBtn key={tag}>{`#${tag}`}</TagBtn>
                ))}
              </TagBox>
            </ContentsBox>
          </RecipeCard>
        </ParentDiv>
      ))}
      <ScrollTopButton />
    </FlexColBox>
  );
}

export default RecipeListCard;
