import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type IngredientProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
};

type ResponseProps = {
  message: string;
  body: IngredientsProps;
};

type IngredientsProps = {
  searches: Array<IngredientProps>;
};

async function getSearchIngredient(keyword: string): Promise<Array<IngredientProps> | null> {
  try {
    const response = await api.get<ResponseProps>(buildUrl(API_PATH.INGREDIENT.LIST, {}, { ingredient: keyword }));
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data.body.searches;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSearchIngredient;
