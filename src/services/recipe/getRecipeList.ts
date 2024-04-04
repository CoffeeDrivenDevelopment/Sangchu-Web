import API_PATH from '../../constants/path';
import api from '../../api/api';
import buildUrl from '../../constants/urlCreater';

type RecipesProps = {
  recipes: RecipeProps[];
  total_count: number;
  last: number;
  has_more: boolean;
};

type RecipeProps = {
  id: number;
  name: string;
  image: string;
  is_liked: boolean;
  tags: Array<string>;
};

type ResponseProps = {
  message: string;
  body: RecipesProps;
};

type SearchParams = {
  type: string;
  query: string;
  last: number;
  size: number;
};

async function getRecipeList(params: SearchParams): Promise<RecipesProps | null> {
  const { type, query, last, size } = params;
  try {
    const response = await api.get<ResponseProps>(
      buildUrl(API_PATH.RECIPE.LIST, {}, { type: type, q: query, last: last, size: size }),
    );
    if (response.status !== 200) {
      throw new Error(`${response}`);
    }
    console.log('응답 데이터', response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getRecipeList;
