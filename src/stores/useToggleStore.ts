import { create } from 'zustand';
import grainsImg from '../assets/images/categories/category-1.png';
import vegetableImg from '../assets/images/categories/category-2.png';
import fruitImg from '../assets/images/categories/category-4.png';
import meatImg from '../assets/images/categories/category-5.png';
import seafoodImg from '../assets/images/categories/category-6.png';
import sausageImg from '../assets/images/categories/sausage.png';
import dairyImg from '../assets/images/categories/dairy-products.png';
import etcImg from '../assets/images/categories/sauce.png';

type ToggleState = {
  labelList: { [key: string]: Array<string> };
  categoryValue: number;
  setCategoryValue: (value: number) => void;
  categoryName: Array<string>;
  categoryImg: Array<string>;
};

const useToggleStore = create<ToggleState>((set) => ({
  labelList: {
    ingredient: ['곡류', '육류', '해물류', '가공식품류', '채소류', '과일류', '달걀/유제품', '기타'],
    profile: ['리뷰', '찜한 레시피', '목표가'],
    follow: ['팔로워', '팔로잉'],
    recipe: ['리뷰', '댓글'],
    report: ['가격 예측', '적정소비금액', '목표가 설정'],
  },
  categoryValue: 0,
  setCategoryValue: (value) => set({ categoryValue: value }),
  categoryName: ['GRAINS', 'MEAT', 'SEAFOOD', 'PROCESSED_FOOD', 'VEGETABLE', 'FRUIT', 'EGGS_DAIRY', 'OTHER'],
  categoryImg: [grainsImg, meatImg, seafoodImg, sausageImg, vegetableImg, fruitImg, dairyImg, etcImg],
}));

export default useToggleStore;
