import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import edit from '../../assets/images/edit.png';
import { main } from '../../assets/styles/palettes';
import { FlexColBox } from '../../components/common/FlexColBox';
import { FlexRowBox } from '../../components/common/FlexRowBox';
import MainButton from '../../components/common/MainButton';
import ShortToggleBar from '../../components/common/ShortToggleBar';
import Logout from '../../components/user/Logout';
import ModifyNickname from '../../components/user/ModifyNickname';
import MyPriceList from '../../components/user/MyPriceList';
import MyReviewList from '../../components/user/MyReviewList';
import MyWishRecipeList from '../../components/user/MyWishRecipeList';
import useToggleStore from '../../stores/useToggleStore';
import * as S from './Profile.styled';

// 유저 정보 인터페이스
interface UserInfo {
  nickname: string;
  profile_image: string;
  follower: number;
  following: number;
}

function Profile() {
  const navigate = useNavigate();
  const { categoryValue } = useToggleStore();

  // 닉네임 및 프로필 이미지 조회
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    profile_image: '',
    follower: 0,
    following: 0,
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const member_id = localStorage.getItem('member_id');
        const response = await api.get<{ body: UserInfo }>(`/member-service/v1/profile/${member_id}`);
        console.log(response.data);
        const { nickname, profile_image, follower, following } = response.data.body;
        setUserInfo({ nickname, profile_image, follower, following });
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, []);

  // 프로필 이미지 수정 및 등록
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string>('');
  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && reader.result) {
        setProfileImg(reader.result as string);
      }
    };

    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('member_id', localStorage.getItem('member_id') || '');
    formData.append('profile_image', file);

    // formData 생성 확인 로그
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await api.patch('/member-service/v1/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const newImgUrl = response.data.body.profile_image;
      console.log('수정 성공', response.data);
      setProfileImg(newImgUrl);
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  const onClickFileBtn = () => {
    imgInputRef.current?.click();
  };

  // 닉네임 수정 및 등록
  const [showModifyNickname, setShowModifyNickname] = useState(false);
  const handleCloseModifyNickname = () => {
    setShowModifyNickname(false);
  };

  const handleNicknameModifyComplete = (newNickname: string) => {
    setShowModifyNickname(false);
    setUserInfo((prevState) => ({
      ...prevState,
      nickname: newNickname,
    }));
  };

  const onClickFollowers = () => {
    navigate('/myfollow', { state: { categoryValue: 0 } });
  };

  const onClickFollowing = () => {
    navigate('/myfollow', { state: { categoryValue: 1 } });
  };

  const onClickModifyAddress = () => {
    navigate('/myaddress');
  };
  return (
    <div>
      <div>
        <AppBar sx={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'NanumSquareRoundEB' }}>
          <Toolbar>
            <FlexRowBox $gap="1px" $justifyContent="space-between" $alignItems="center" $width="100%">
              <div onClick={onClickModifyAddress}>나의 위치</div>
              <FlexRowBox $gap="0.3rem" $alignItems="center">
                <Logout />
              </FlexRowBox>
            </FlexRowBox>
          </Toolbar>
        </AppBar>
      </div>
      <S.BelowHeader>
        <input
          type="file"
          id="imgInput"
          accept="image/jpg,image/png,image/jpeg"
          style={{ display: 'none' }}
          ref={imgInputRef}
          onChange={changeImg}
        />
        <S.ProfileContainer>
          <Avatar
            alt="프로필 이미지"
            src={profileImg || userInfo.profile_image}
            sx={{ width: 120, height: 120 }}
            onClick={onClickFileBtn}
          ></Avatar>
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
        {showModifyNickname ? (
          <FlexColBox $justifyContent="center" $alignItems="center" $margin="0 0 2vh 0">
            <MainButton text="취소" backgroundColor={main} onClick={() => setShowModifyNickname(false)} />
            <ModifyNickname onClose={handleCloseModifyNickname} onComplete={handleNicknameModifyComplete} />
          </FlexColBox>
        ) : (
          <S.NicknameContainer onClick={() => setShowModifyNickname(true)}>
            {' '}
            {userInfo.nickname}
            <S.IconContainer>
              <img src={edit} alt="닉네임변경아이콘" />
            </S.IconContainer>
          </S.NicknameContainer>
        )}
        <div style={{ padding: '0 0.8rem' }}>
          <ShortToggleBar labelType="profile" initialValue={categoryValue} />
          {categoryValue === 0 ? <MyReviewList /> : <div></div>}
          {categoryValue === 1 ? <MyWishRecipeList /> : <div></div>}
          {categoryValue === 2 ? <MyPriceList /> : <div></div>}
        </div>
      </S.BelowHeader>
    </div>
  );
}

export default Profile;
