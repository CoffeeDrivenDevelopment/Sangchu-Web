import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/common/NavigationBar';

function Layout() {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const scrollEvent = useCallback(() => {
    const currentScrollPos = scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 1);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    addEventListener('scroll', scrollEvent);

    return () => {
      removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  return (
    <div>
      <Outlet />
      <NavigationBar visible={visible} />
    </div>
  );
}

export default Layout;
