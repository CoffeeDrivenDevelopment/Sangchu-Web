import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import MainButton from '../common/MainButton';
import { Gray } from '../../assets/styles/palettes';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Following {
  member_id: number;
  nickname: string;
  profile_image: string;
}

function FollowingList() {
  const [followings, setFollowings] = useState<Following[]>([]);
  const member_id = localStorage.getItem('member_id');

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const response = await api.post('/member-service/v1/following', { member_id: member_id, auth_id: member_id });
        const followingsData: Following[] = response.data.body.followings || [];
        setFollowings(followingsData);
      } catch (error) {
        console.log('요청 실패', error);
      }
    };

    if (member_id) {
      getFollowings();
    }
  }, [member_id]);

  const handleUnfollow = async (followingId: number) => {
    try {
      await api.delete('/member-service/v1/follow', {
        data: {
          follower: member_id,
          following: followingId,
        },
      });
      // 언팔로우 성공한 경우 팔로잉 목록에서 해당 사용자 제거
      setFollowings((prevFollowings) => prevFollowings.filter((user) => user.member_id !== followingId));
    } catch (error) {
      console.error('언팔로우 실패', error);
    }
  };

  const navigate = useNavigate();
  const onClickProfile = (memberId: number) => {
    navigate(`/profile/${memberId}`); // 프로필 경로로 이동
  };

  return (
    <div>
      {followings.length > 0 ? (
        followings.map((following) => (
          <ListContainer key={following.member_id}>
            <ListArea onClick={() => onClickProfile(following.member_id)}>
              <Avatar src={following.profile_image} alt={following.nickname} sx={{ width: 80, height: 80 }} />
              <NicknameArea>
                <div>{following.nickname}</div>
              </NicknameArea>
            </ListArea>
            <ButtonArea>
              <MainButton text="팔로잉" backgroundColor={Gray} onClick={() => handleUnfollow(following.member_id)} />
            </ButtonArea>
          </ListContainer>
        ))
      ) : (
        <Message>
          <div>팔로우 중인 회원이 없습니다.</div>
          <div> 다른 회원을 팔로우해보세요!</div>
        </Message>
      )}
    </div>
  );
}

export default FollowingList;

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5%;
`;

export const NicknameArea = styled.div`
  font-family: 'NanumSquareRoundB';
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  white-space: nowrap;
`;

export const ButtonArea = styled.div`
  margin-left: auto;
`;

export const Message = styled.div`
  font-family: 'NanumSquareRoundB';
  margin-left: auto;
  font-size: larger;
  text-align: center;
  margin: 2rem;
`;

export const ListArea = styled.div`
  display: flex;
  align-items: center;
`;
