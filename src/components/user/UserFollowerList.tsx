import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import MainButton from '../common/MainButton';
import { main, Gray } from '../../assets/styles/palettes';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Follower {
  member_id: number;
  nickname: string;
  profile_image: string;
  followed: boolean;
}

function UserFollowerList() {
  // 팔로워 정보 요청
  const [followers, setFollowers] = useState<Follower[]>([]);
  const auth_id = localStorage.getItem('member_id');
  const { id } = useParams();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await api.post('/member-service/v1/follower', { auth_id: auth_id, member_id: id });
        console.log('response.data', response.data);
        console.log('response.data.followers', response.data.body.followers);
        const followerData = response.data.body.followers || [];
        setFollowers(followerData);
      } catch (error) {
        console.log('요청 실패', error);
        console.log(id);
      }
    };

    getFollowers();
  }, []);

  const toggleFollow = async (followingId: number, followed: boolean) => {
    const followerId = localStorage.getItem('member_id');
    const shouldFollow = !followed;

    try {
      if (shouldFollow) {
        // 팔로우 API 요청
        const response = await api.post(`/member-service/v1/follow`, {
          follower: followerId,
          following: followingId,
        });
        console.log('팔로우 상태 변경 성공', response.data);
      } else {
        // 언팔로우 API 요청
        const response = await api.delete(`/member-service/v1/follow`, {
          data: {
            follower: followerId,
            following: followingId,
          },
        });
        console.log('언팔로우 상태 변경 성공', response.data);
        console.log('follower 로그인한 사람', followerId);
        console.log('following 리스트 주인', followingId);
      }

      setFollowers((prevFollowers) => {
        return prevFollowers.map((follower) => {
          if (follower.member_id === followingId) {
            return { ...follower, followed: shouldFollow };
          }
          return follower;
        });
      });
    } catch (error) {
      console.error('팔로우 상태 변경 실패', error);
    }
  };
  const navigate = useNavigate();
  const onClickProfile = (memberId: number) => {
    navigate(`/profile/${memberId}`); // 프로필 경로로 이동
  };

  return (
    <div>
      {followers.length > 0 ? (
        followers.map((follower) => (
          <ListContainer key={follower.member_id}>
            <ListArea onClick={() => onClickProfile(follower.member_id)}>
              <Avatar src={follower.profile_image} alt={follower.nickname} sx={{ width: 80, height: 80 }} />
              <NicknameArea>
                <div>{follower.nickname}</div>
              </NicknameArea>
            </ListArea>
            <ButtonArea>
              {follower.member_id !== Number(auth_id) && (
                <MainButton
                  text={follower.followed ? '언팔로우' : '팔로우'}
                  backgroundColor={follower.followed ? Gray : main}
                  onClick={() => toggleFollow(follower.member_id, follower.followed)}
                />
              )}
            </ButtonArea>
          </ListContainer>
        ))
      ) : (
        <Message>
          <div>팔로워가 없습니다.</div>
        </Message>
      )}
    </div>
  );
}

export default UserFollowerList;

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5%;
`;

export const NicknameArea = styled.div`
  font-family: 'NanumSquareRoundB';
  display: flex;
  flex-direction: column;
  margin-left: 5%;
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
