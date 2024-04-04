import Header from '../../components/common/Header';
import ShortToggleBar from '../../components/common/ShortToggleBar';
import FollowerList from '../../components/user/MyFollowerList';
import FollowingList from '../../components/user/MyFollowingList';
import useToggleStore from '../../stores/useToggleStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Follow() {
  // 토글바 탭 상태 추적
  const location = useLocation();
  const categoryValueFromProfile = location.state?.categoryValue || 0;
  const { categoryValue, setCategoryValue } = useToggleStore();

  useEffect(() => {
    setCategoryValue(categoryValueFromProfile);
  }, [categoryValueFromProfile, setCategoryValue]);

  return (
    <div>
      <Header></Header>
      <ShortToggleBar labelType="follow" initialValue={categoryValueFromProfile} />
      {categoryValue === 0 ? <FollowerList /> : <FollowingList />}
    </div>
  );
}

export default Follow;
