import styled from '@emotion/styled';
import { FlexColBox } from '../common/FlexColBox';
import likeImg from '../../assets/images/recipeLike.png';
import { LightGray } from '../../assets/styles/palettes';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useEffect, useState, useRef } from 'react';
import no_image from '../../assets/images/no_image.png';

interface RecipeResponse {
  message: string;
  body: {
    recipes: Recipe[];
    total_count: number;
    last: number;
    has_more: boolean;
  };
}

interface Recipe {
  id: number;
  image: string;
  name: string;
  is_liked: boolean;
  tags: string[];
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
        const response = await api.get<RecipeResponse>(`/recipe-service/v1/likes/${member_id}?page=${currentPage}`);
        const { recipes, total_count } = response.data.body;
        setTotalPages(Math.ceil(total_count / 4)); // 4는 페이지당 레시피 개수
        setRecipeListData((prevRecipes) => [...prevRecipes, ...recipes]);
        console.log('좋아요한 레시피 조회 성공', recipes);
        console.log('current page number', currentPage);
      } catch (error) {
        console.log('좋아요한 레시피 요청 실패', error);
        console.log('현재 페이지', currentPage);
      } finally {
        setIsLoading(false);
      }
    };
    
    getMyRecipeList();
  }, [currentPage]);

  const moveToDetail = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: {
        id: recipe.id,
        img: recipe.image || no_image,
        name: recipe.name,
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
      setRecipeListData((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.log(error);
      console.log('id', id);
      setRecipeListData((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id)); // 일단 요청 실패해도 삭제
    }
  };

  return (
    <FlexColBox ref={containerRef} $margin="1rem" $gap="1rem">
      {recipeListData.map((recipe) => (
        <RecipeCard key={recipe.id} onClick={() => moveToDetail(recipe)}>
          <ImgBox>
            <img src={recipe.image || no_image} alt="레시피 이미지" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
          </ImgBox>
          <ContentsBox>
            <HeaderBox>
              <h2>{recipe.name}</h2>
              <UnlikeButton
                onClick={(event) => {
                  event.stopPropagation();
                  unLike(recipe.id);
                }}
              >
                <img src={likeImg} alt="연한 숟가락" width={'25vw'} />
              </UnlikeButton>
            </HeaderBox>

            <TagBox>
              <TagBtn>{`#${recipe.tags[0]}`}</TagBtn>
              <TagBtn>{`#${recipe.tags[1]}`}</TagBtn>
              <TagBtn>{`#${recipe.tags[2]}`}</TagBtn>
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
  height: 110px;
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
  margin-left: 0.5rem;
`;
