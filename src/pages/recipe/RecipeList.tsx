import { useLocation } from 'react-router-dom';
import TitleBox from '../../components/common/TitleBox';
import Header from '../../components/common/Header';
import dummy from '../../services/recipe/recipeCategory.json';
import useRecipeCategoryStore from '../../stores/useRecipeCategoryStore';
import RecipeListCard from '../../components/recipe/RecipeListCard';

function RecipeList() {
  const location = useLocation();
  const categoryId = location.state.id;
  const { imgList } = useRecipeCategoryStore();

  return (
    <div>
      <Header />
      <TitleBox text={dummy.category[categoryId - 1].name} img={imgList[categoryId - 1]} />
      <RecipeListCard />
    </div>
  );
}

export default RecipeList;
