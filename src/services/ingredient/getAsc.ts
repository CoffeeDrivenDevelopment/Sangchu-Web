import API_PATH from '../../constants/path';
import api from '../../api/api';

type RankAscProps = {
  ingredient_gap_list: Array<RankAscInfoProps>;
};

type RankAscInfoProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
  prev_price: number;
  curr_price: number;
};

type ResponseProps = {
  message: string;
  body: RankAscProps;
};

async function getAsc(): Promise<RankAscProps | null> {
  try {
    const response = await api.get<ResponseProps>(API_PATH.INGREDIENT.ASC);
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

export default getAsc;
