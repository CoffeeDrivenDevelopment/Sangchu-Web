import API_PATH from '../../constants/path';
import api from '../../api/api';

type RankDescProps = {
  ingredient_gap_list: Array<RankDescInfoProps>;
};

type RankDescInfoProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
  percent: number;
};

type ResponseProps = {
  message: string;
  body: RankDescProps;
};

async function getDesc(): Promise<RankDescProps | null> {
  try {
    const response = await api.get<ResponseProps>(API_PATH.INGREDIENT.DESC);
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

export default getDesc;
