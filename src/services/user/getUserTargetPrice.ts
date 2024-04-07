import api from '../../api/api';

// 나의 목표가 조회
async function getUserTargetPrice(): Promise<TargetList | null> {
  try {
    const response = await api.get<TargetApiResponse>('/recipe-service/v1/targetprice');
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

export default getUserTargetPrice;
