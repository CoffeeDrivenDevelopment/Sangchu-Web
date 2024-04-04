import api from '../../api/api';

interface UserInfo {
  nickname: string;
  profile_image: string;
  follower: string;
  following: string;
}

export async function getUserInfo(memberId: string): Promise<UserInfo> {
  try {
    const response = await api.get<{ body: UserInfo }>(`/member-service/v1/profile/${memberId}`);
    return response.data.body;
  } catch (error) {
    throw new Error('Failed to fetch user information');
  }
}

//  const getUserInfo = async () => {
//    try {
//      const member_id = localStorage.getItem('member_id');
//      const response = await api.get<{ body: UserInfo }>(`/member-service/v1/profile/${member_id}`);
//      console.log(response.data);
//      const { nickname, profile_image, follower, following } = response.data.body;
//      setUserInfo({ nickname, profile_image, follower, following });
//    } catch (error) {
//      console.log(error);
//    }
//  };

//  getUserInfo();
