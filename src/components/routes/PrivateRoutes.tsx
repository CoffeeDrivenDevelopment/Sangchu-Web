import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const isLogin = !!localStorage.getItem('access_token');
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
