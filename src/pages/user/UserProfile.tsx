import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './Profile.styled';
import Avatar from '@mui/material/Avatar';
import MainButton from '../../components/common/MainButton';
import { main, LightGray } from '../../assets/styles/palettes';
import styled from '@emotion/styled';
import UserReviewList from '../../components/user/UserReviewList';
import Header from '../../components/common/Header';

interface UserInfo {
  nickname: string;
  profile_image: string;
  follower: number;
  following: number;
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    profile_image: '',
    follower: 0,
    following: 0,
  });
  const [isFollowing, setIsFollowing] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await api.get<{ body: UserInfo }>(`/member-service/v1/profile/${id}`);
      console.log(response.data);
      const { nickname, profile_image, follower, following } = response.data.body;
      setUserInfo({ nickname, profile_image, follower, following });

      const relationRes = await api.post('/member-service/v1/followed', {
        follower: localStorage.getItem('member_id'),
        following: id,
      });
      const isFollowed = relationRes.data.body.followed;
      setIsFollowing(isFollowed);
      console.log(relationRes.data);
      // 본인은 '/profile/본인아이디' 경로로 들어갈 수 없도록 처리
      if (id && localStorage.getItem('member_id') === id) {
        return navigate('/myprofile');
      }
    } catch (error) {
      console.log(error);
      console.log(id);
    }
  };

  // 팔로우/언팔로우 클릭 시 값이 바로 반영되어 렌더링되도록
  // getUserInfo(); 함수를 useEffect에서 꺼내고
  // 버튼 클릭 동작에서 함수를 호출하도록 코드 수정함.
  // 이후 코드 리팩토링 필요
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleFollow = async () => {
    try {
      // 팔로우/언팔로우 버튼 클릭 시 상태 변경
      setIsFollowing((prev) => !prev);

      if (!isFollowing) {
        await api.post(`/member-service/v1/follow`, {
          follower: localStorage.getItem('member_id'),
          following: id,
        });
      } else {
        await api.delete(`/member-service/v1/follow`, {
          data: {
            follower: localStorage.getItem('member_id'),
            following: id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    getUserInfo();
  };

  const onClickFollowers = () => {
    navigate(`/profile/${id}/userfollow`, { state: { categoryValue: 0 } });
  };

  const onClickFollowing = () => {
    navigate(`/profile/${id}/userfollow`, { state: { categoryValue: 1 } });
  };

  return (
    <div>
      <Header></Header>
      <Space></Space>
      <S.ProfileContainer>
        <Avatar alt="프로필 이미지" src={userInfo.profile_image} sx={{ width: 120, height: 120 }}></Avatar>
        <S.FollowContainer>
          <S.FollowerText onClick={onClickFollowers}>
            팔로워
            <div>{userInfo.follower}명</div>
          </S.FollowerText>
          <S.FollowingText onClick={onClickFollowing}>
            팔로잉
            <div>{userInfo.following}명</div>
          </S.FollowingText>
        </S.FollowContainer>
      </S.ProfileContainer>
      <S.NicknameContainer>{userInfo.nickname}</S.NicknameContainer>
      <ButtonContainer>
        {!isFollowing && <MainButton text="팔로우" backgroundColor={main} onClick={handleFollow} />}
        {isFollowing && (
          <MainButton text="언팔로우" backgroundColor={LightGray} textColor="black" onClick={handleFollow} />
        )}
      </ButtonContainer>
      <DevideLine></DevideLine>
      <UserReviewList></UserReviewList>
    </div>
  );
}

export default UserProfile;

export const ButtonContainer = styled.div`
  font-family: 'NanumSquareRoundB';
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;

export const Space = styled.div`
  padding: 1rem;
`;

export const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`;
