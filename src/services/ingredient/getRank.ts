import API_PATH from '../../constants/path';
import api from '../../api/api';

type RankProps = {
  populars: Array<RankInfoProps>;
};

type RankInfoProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
};

type ResponseProps = {
  message: string;
  body: RankProps;
};

async function getRank(): Promise<RankProps | null> {
  try {
    const response = await api.get<ResponseProps>(API_PATH.INGREDIENT.RANK);
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

export default getRank;
