import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type ResponseProps = {
  message: string;
  body: DetailProps;
};

type DetailProps = {
  id: number;
  name: string;
  image: string;
  recipe_type: string;
  food_style: string;
  main_ingredient_type: string;
  ingredient: string;
  food_portion: string;
  cooking_time: string;
  cooking_difficulty: string;
  serial_number: number;
};

async function getRecipeDetail(recipe_id: number): Promise<DetailProps | null> {
  try {
    const response = await api.get<ResponseProps>(buildUrl(API_PATH.RECIPE.DETAIL, { recipe_id }));
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getRecipeDetail;
