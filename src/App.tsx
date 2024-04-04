import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import global from './assets/styles/global';
import reset from './assets/styles/reset';
import RecipeInfo from './components/recipe/RecipeInfo';
import PrivateRoute from './components/routes/PrivateRoutes';
import Home from './pages/Home/Home';
import Layout from './pages/Layout';
import IngredientList from './pages/ingredients/IngredientList';
import Ingredients from './pages/ingredients/Ingredients';
import IngredientsDetail from './pages/ingredients/IngredientsDetail';
import OfflineMap from './pages/ingredients/OfflineMap';
import RecipeDetail from './pages/recipe/RecipeDetail';
import RecipeList from './pages/recipe/RecipeList';
import Recipes from './pages/recipe/Recipes';
import IngredientReport from './pages/report/IngredientReport';
import ReviewDetail from './pages/review/ReviewDetail';
import ReviewWrite from './pages/review/ReviewWrite';
import Follow from './pages/user/Follow';
import Profile from './pages/user/MyProfile';
import RegisterAddress from './pages/user/RegisterAddress';
import RegisterNickname from './pages/user/RegisterNickname';
import Signup from './pages/user/Signup';
import SignupLoad from './pages/user/SignupLoad';
import UserFollow from './pages/user/UserFollow';
import UserProfile from './pages/user/UserProfile';
import RecipeMovie from './pages/recipe/RecipeMovie';
import MyAddress from './components/user/MyAddress';

function App() {
  return (
    <div>
      <Global styles={[reset, global]} />
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route path="/load" element={<SignupLoad />} />
        <Route path="/nickname" element={<RegisterNickname />} />
        <Route path="/address" element={<RegisterAddress />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/myaddress" element={<MyAddress />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/myfollow" element={<Follow />} />
            <Route path="/profile/:id/userfollow" element={<UserFollow />} />
            <Route path="recipe" element={<Recipes />} />
            <Route path="recipe/:id" element={<RecipeDetail />}>
              <Route path="" element={<RecipeInfo />} />
              <Route path="movie" element={<RecipeMovie />} />
              <Route path="review/write" element={<ReviewWrite />} />
            </Route>
            <Route path="/recipe/:id/review/:id" element={<ReviewDetail />} />
            <Route path="recipe/category/:id" element={<RecipeList />} />
            <Route path="ingredient" element={<Ingredients />} />
            <Route path="ingredient/:id" element={<IngredientsDetail />} />
            <Route path="ingredient/category" element={<IngredientList />} />
            <Route path="ingredient/report/:id" element={<IngredientReport />} />
            <Route path="ingredient/map/:id" element={<OfflineMap />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
