import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { main } from '../../assets/styles/palettes';
import up_arrow from '../../assets/images/up_arrow.png';

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="small"
        onClick={handleScrollTop}
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: main,
          '&:focus': {
            backgroundColor: main,
          },
          '&:hover': {
            backgroundColor: main,
          },
        }}
      >
        <img src={up_arrow} style={{ width: '20px', height: '20px' }} />
      </Fab>
    </Zoom>
  );
}
export default ScrollTopButton;
