type ChartDataProps = {
  date: string;
  price: number;
};

type RecommendIngredientProps = {
  id: number;
  name: string;
  img: string;
  online: ChartDataProps[];
  offline: ChartDataProps[];
};

type RecommendIngredientKeyProps = {
  key: string;
  ingredients: RecommendIngredientProps;
};

type RecommendIngredientFuncProps = {
  ingredient: RecommendIngredientProps;
  updateAt: string;
};

type RecommendIngredientsProps = {
  message?: string;
  body: RecommendIngredientsBodyProps;
};

type RecommendIngredientsBodyProps = {
  updateAt: string;
  ingredients: RecommendIngredientKeyProps[];
};

type IngredientDetailProps = {
  message?: string;
  body: {
    name: string;
    'know-how': string;
    img: string;
  };
};

type IngredientDetailBodyProps = {
  name: string;
  'know-how': string;
  img: string;
};

// api 호출 함수 이용
type IngredientGraphProps = {
  message?: string;
  body: IngredientOfflineGraphBodyProps;
};

type IngredientGraphBodyProps = {
  updateAt: string;
  data: ChartDataProps[];
  today: {
    price: number;
    percent: number;
  };
};

// api 호출 함수 이용
type IngredientOnlineGraphProps = {
  message?: string;
  body: {
    updateAt: string;
    online: ChartDataProps[];
    today: {
      price: number;
      percent: number;
    };
  };
};

type OfflineMarketsProps = {
  name: string;
  price: number;
  dist: number;
  lat: number;
  lng: number;
};

type OnlineMarketsProps = {
  market_name: string;
  market_link: string;
  price: number;
};

type ReportGraphProps = {
  message?: string;
  body: ReportGraphBodyProps;
};

type ReportGraphBodyProps = {
  updateAt: string;
  'target-price': number;
  'today-minimum-price': number;
  'market-type': string[];
  markets: Array<MarketContentsProps>;
};

type MarketContentsProps = {
  [key: string]: Array<ChartDataProps>;
};

type NameProps = {
  name: string;
};
