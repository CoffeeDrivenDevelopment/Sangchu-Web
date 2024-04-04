import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import home from '../../assets/images/home.png';
import cookbook from '../../assets/images/cookbook.png';
import food from '../../assets/images/healthy-food.png';
import user from '../../assets/images/user.png';
import homeOff from '../../assets/images/home_off.png';
import cookbookOff from '../../assets/images/cookbook_off.png';
import foodOff from '../../assets/images/healthy-food_off.png';
import userOff from '../../assets/images/user_off.png';

const NavBox = styled.div`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 100%;
  position: fixed;
  bottom: -0.5px;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  transition: transform 0.3s ease-in-out;
  transform: translateY(0);
`;

const IconBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavIcon = styled.img`
  width: 20px;
  margin-bottom: 5px;
`;

const NavName = styled.span`
  font-family: 'NanumSquareRoundEB';
  font-size: 12px;
`;

const NavNameOff = styled.span`
  font-family: 'NanumSquareRoundEB';
  font-size: 12px;
  color: #b8b8b8;
`;

function NavigationBar({ visible }: { visible: boolean }) {
  const [choice, setChoice] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const locArr = location.pathname.split('/');
    if (location.pathname === '/') {
      setChoice('home');
    } else {
      setChoice(locArr[1]);
    }
  }, [location]);

  return (
    <NavBox style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}>
      <IconBox to={'/'}>
        <NavIcon src={choice === 'home' ? home : homeOff} alt="홈 이미지" />
        {choice === 'home' ? <NavName>홈</NavName> : <NavNameOff>홈</NavNameOff>}
      </IconBox>
      <IconBox to={'/recipe'}>
        <NavIcon src={choice === 'recipe' ? cookbook : cookbookOff} alt="쿡북 이미지" />
        {choice === 'recipe' ? <NavName>레시피</NavName> : <NavNameOff>레시피</NavNameOff>}
      </IconBox>
      <IconBox to={'/ingredient'}>
        <NavIcon src={choice === 'ingredient' ? food : foodOff} alt="음식 이미지" />
        {choice === 'ingredient' ? <NavName>식재료</NavName> : <NavNameOff>식재료</NavNameOff>}
      </IconBox>
      <IconBox to={'/myprofile'}>
        <NavIcon src={choice === 'myprofile' ? user : userOff} alt="유저 이미지" />
        {choice === 'myprofile' ? <NavName>프로필</NavName> : <NavNameOff>프로필</NavNameOff>}
      </IconBox>
    </NavBox>
  );
}

export default NavigationBar;
