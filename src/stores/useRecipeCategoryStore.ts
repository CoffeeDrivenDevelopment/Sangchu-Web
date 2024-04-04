import { create } from 'zustand';
import dessert from '../assets/images/recipes/dessert.png';
import side from '../assets/images/recipes/side.png';
import rice from '../assets/images/recipes/rice.png';
import main from '../assets/images/recipes/main.png';
import noodle from '../assets/images/recipes/noodle.png';
import bread from '../assets/images/recipes/bread.png';
import source from '../assets/images/recipes/source.png';
import steak from '../assets/images/recipes/steak.png';
import soup from '../assets/images/recipes/soup.png';
import cookie from '../assets/images/recipes/cookie.png';
import drink from '../assets/images/recipes/drink.png';
import jikae from '../assets/images/recipes/jikae.png';
import gouk from '../assets/images/recipes/gouk.png';
import salad from '../assets/images/recipes/salad.png';
import fusion from '../assets/images/recipes/fusion.png';
import kimchi from '../assets/images/recipes/kimchi.png';
import etc from '../assets/images/recipes/etc.png';

type RecipeCategoryState = {
  imgList: Array<string>;
  categoryName: Array<string>;
};

const useRecipeCategoryStore = create<RecipeCategoryState>(() => ({
  imgList: [
    dessert,
    side,
    rice,
    main,
    noodle,
    bread,
    source,
    steak,
    soup,
    cookie,
    drink,
    jikae,
    gouk,
    salad,
    fusion,
    kimchi,
    etc,
  ],
  categoryName: [
    'DESERT',
    'SIDEDISH',
    'RICE',
    'MAINDISH',
    'NOODLEDUMPLING',
    'BREAD',
    'SAUCE',
    'WESTERN',
    'SOUP',
    'SNACK',
    'DRINK',
    'STEW',
    'STEWSOUP',
    'SALAD',
    'FUSION',
    'PICKLES',
    'OTHER',
  ],
}));

export default useRecipeCategoryStore;
