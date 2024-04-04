import { useNavigate } from 'react-router-dom';
import IconBox from '../common/IconBox';
import dummy from '../../services/recipe/recipeCategory.json';
import useRecipeCategoryStore from '../../stores/useRecipeCategoryStore';

function RecipeCategory() {
  const navigate = useNavigate();
  const { imgList } = useRecipeCategoryStore();

  const moveToList = (id: number) => {
    navigate(`category/${id}`, {
      state: {
        id: id,
      },
    });
  };

  return dummy.category.map(
    (recipe) =>
      recipe.id !== 17 && (
        <div key={recipe.id} onClick={() => moveToList(recipe.id)}>
          <IconBox text={recipe.name} img={imgList[recipe.id - 1]} />
        </div>
      ),
  );
}

export default RecipeCategory;
