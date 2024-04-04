import { useLocation, Outlet } from 'react-router-dom';
import Header from '../../components/common/Header';

function RecipeDetail() {
  const location = useLocation();

  return (
    <div>
      <Header name={location.state.name} />
      <Outlet />
    </div>
  );
}

export default RecipeDetail;
