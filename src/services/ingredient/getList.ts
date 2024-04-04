import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type IngredientsProps = {
  searches: Array<IngredientProps>;
};

type IngredientProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
};

type ResponseProps = {
  message: string;
  body: IngredientsProps;
};

async function getList(categoryValue: string): Promise<IngredientsProps | null> {
  try {
    console.log('카테고리 이름', categoryValue);
    const response = await api.get<ResponseProps>(buildUrl(API_PATH.INGREDIENT.LIST, {}, { category: categoryValue }));
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

export default getList;
