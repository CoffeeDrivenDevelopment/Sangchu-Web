import API_PATH from '../../constants/path';
import api from '../../api/api';

type patchUserAddressProps = {
  message?: string;
  body: patchUserAddressBodyProps;
};

type patchUserAddressBodyProps = {
  member_id: number;
  nickname: string;
  lat: number;
  lng: number;
  profile_image: string;
};

// 사용자 주소 설정
async function patchUserAddress(lat?: number, lng?: number): Promise<patchUserAddressBodyProps | null> {
  try {
    const response = await api.patch<patchUserAddressProps>(API_PATH.LOCATION, { lat: lat, lng: lng });
    if (response.status !== 200) {
      throw new Error(`${response.data.message}`);
    }
    console.log(response.data.message);
    return response.data.body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default patchUserAddress;