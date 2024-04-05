import styled from '@emotion/styled';
import { FlexColBox } from '../common/FlexColBox';
import unlikeImg from '../../assets/images/recipeUnlike.png';
import { LightGray } from '../../assets/styles/palettes';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useEffect, useState, useRef } from 'react';

interface Recipe {
  recipe_id: number;
  recipe_title: string;
  recipe_image: string;
  // 태그
  food_category: string;
  cooking_difficulty: string;
  cooking_time: string;
}

interface RecipeResponse {
  message: string;
  body: {
    recipes: {
      totalPages: number;
      content: Recipe[];
    };
  };
}

function MyWishRecipeList() {
  const navigate = useNavigate();
  const [recipeListData, setRecipeListData] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMyRecipeList = async () => {
      try {
        setIsLoading(true);
        const member_id = localStorage.getItem('member_id');
        const response = await api.get<RecipeResponse>(
          `/recipe-service/v1/likes/${member_id}?page=${currentPage}&size=10&sort=asc`,
        );
        setTotalPages(response.data.body.recipes.totalPages);
        setRecipeListData((prevRecipes) => [...prevRecipes, ...response.data.body.recipes.content]);
        console.log('찜한 레시피 조회 성공', response.data.body.recipes);
      } catch (error) {
        console.log('찜한 레시피 요청 실패', error);
        console.log('현재 페이지', currentPage);
      } finally {
        setIsLoading(false);
      }
    };

    getMyRecipeList();
  }, [currentPage]);

  const moveToDetail = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.recipe_id}`, {
      state: {
        img: recipe.recipe_image,
        name: recipe.recipe_title,
      },
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight && currentPage < totalPages && !isLoading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const unLike = async (id: number) => {
    try {
      const response = await api.delete(`/recipe-service/v1/recipes/${id}/likes`);
      console.log('레시피 좋아요 취소', response.data);
      // 요청 성공 시 목록에서 제거
      setRecipeListData((prevRecipes) => prevRecipes.filter((recipe) => recipe.recipe_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexColBox ref={containerRef} $margin="1rem" $gap="1rem">
      {recipeListData.map((recipe) => (
        <RecipeCard key={recipe.recipe_id} onClick={() => moveToDetail(recipe)}>
          <ImgBox>
            <img src={recipe.recipe_image} alt="레시피 이미지" style={{ width: '100%' }} />
          </ImgBox>
          <ContentsBox>
            <HeaderBox>
              <h2>{recipe.recipe_title}</h2>
              <UnlikeButton onClick={() => unLike(recipe.recipe_id)}>
                <img src={unlikeImg} alt="연한 숟가락" />
              </UnlikeButton>
            </HeaderBox>

            <TagBox>
              <TagBtn>{`#${recipe.food_category}`}</TagBtn>
              <TagBtn>{`#${recipe.cooking_difficulty}`}</TagBtn>
              <TagBtn>{`#${recipe.cooking_time}`}</TagBtn>
            </TagBox>
          </ContentsBox>
        </RecipeCard>
      ))}
      {isLoading && <Message>로딩 중...</Message>}
      {!isLoading && recipeListData.length === 0 && <Message>찜한 레시피가 없습니다.</Message>}
      {!isLoading && currentPage >= totalPages && currentPage > 1 && <Message>더 이상 레시피가 없습니다.</Message>}
    </FlexColBox>
  );
}

export default MyWishRecipeList;

const RecipeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  height: 160px;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.1);
`;

const ImgBox = styled.div`
  width: 110px;
  margin-left: 0.5rem;
`;

const ContentsBox = styled.div`
  margin: 0 1rem;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  border-radius: 15px;
`;

const Message = styled.div`
  font-family: 'NanumSquareRoundB';
  margin: 1rem;
  margin-top: 2rem;
  text-align: center;
`;

const UnlikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
`;
