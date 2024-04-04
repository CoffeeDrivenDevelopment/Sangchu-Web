/* 

  뒤로 가는 버튼 있는 헤더(스크롤에 따라 보이고 안보임)
  props 아무것도 안 넣으면 뒤로가기만 있는 헤더
  isHelp는 구매요령 유무임

  [사용예시]

  1. 재료 상세 정보 페이지에서 사용할 때(구매요령 있음)

  - 함수 선언
  const openModal = () => setIsModalClick(true);

  - return
  <Header name="호박" openModal={openModal} isHelp={true} />

  2. 레시피 상세 정보 페이지에서 사용할 때(구매요령 없음)

  <Header name="가지구이" />

  3. 나머지 페이지에서 사용할 때

  <Header />

*/

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import CssBaseline from '@mui/material/CssBaseline';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
// import Slide from '@mui/material/Slide';
import left_arrow from '../../assets/images/left-arrow.png';
import help from '../../assets/images/help.png';
import { FlexRowBox } from './FlexRowBox';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  name?: string;
  openModal?: () => void;
  isHelp?: boolean;
};

function HideOnScroll(props: HeaderProps) {
  const { name, openModal, isHelp } = props;
  // const trigger = useScrollTrigger();
  const navigate = useNavigate();
  return (
    // <Slide appear={false} direction="down" in={!trigger}>
    <AppBar sx={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'NanumSquareRoundEB' }}>
      <Toolbar>
        <FlexRowBox $gap="8px" $alignItems="center" $width="100%">
          <img src={left_arrow} style={{ width: '20px', height: '20px' }} onClick={() => navigate(-1)} />
          {name && !isHelp ? (
            // 구매 요령 없음(레시피 상세 페이지)
            <div>{name}</div>
          ) : !name && !isHelp ? (
            // name도 없음
            <div style={{ color: '#ffffff' }}>empty</div>
          ) : (
            // 구매 요령 있음(재료 상세 페이지)
            <FlexRowBox $gap="1px" $justifyContent="space-between" $alignItems="center" $width="100%">
              <div>{name}</div>
              <FlexRowBox $gap="0.3rem" $alignItems="center" onClick={openModal}>
                <img src={help} style={{ width: '25px', height: '25px' }} />
                <div>구매요령</div>
              </FlexRowBox>
            </FlexRowBox>
          )}
        </FlexRowBox>
      </Toolbar>
    </AppBar>
    // </Slide>
  );
}

function Header(props: HeaderProps) {
  return (
    <div>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props} />
      <div style={{ width: '344px', height: '56px' }}></div>
    </div>
  );
}

export default Header;
