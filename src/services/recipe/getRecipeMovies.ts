import api from '../../api/api';
import API_PATH from '../../constants/path';
import buildUrl from '../../constants/urlCreater';

type MoviesProps = {
  message?: string;
  body: MoviesBodyProps;
};

type MoviesBodyProps = {
  cooking_movies: [
    {
      url: string;
      thumbnail: string;
      title: string;
      content: string;
    },
  ];
  total_count: number;
};
// 레시피 영상 조회
async function getRecipeMovies(name: string): Promise<MoviesBodyProps | null> {
  try {
    const resultUrl = buildUrl(API_PATH.RECIPE.MOVIES, {}, { name: name });
    const response = await api.get<MoviesProps>(resultUrl);
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(name);
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getRecipeMovies;

// import dummy from './getRecipeMovies.json';
// async function getRecipeMovies(name: string) {
//   console.log(name);
//   return dummy.body;
// }

// export default getRecipeMovies;
