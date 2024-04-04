type RecommendRecipeInfoProps = {
  id: number;
  name: string;
  img: string;
  tags: string[];
  ingredients: string;
};

type RecommendRecipeMovieProps = {
  url: string;
  thumbnail: string;
  title: string;
  content: string;
};

// api 호출 함수 이용
type RecommendRecipeProps = {
  message?: string;
  body: RecommendRecipeBodyProps;
};

// api 호출 함수 이용
type RecommendRecipeBodyProps = {
  recipe: RecommendRecipeInfoProps;
  'cooking-movies': RecommendRecipeMovieProps[];
};
type RecommendRecipeFuncProps = {
  recipe: RecommendRecipeInfoProps;
  cookingMovie: RecommendRecipeMovieProps;
};

type CommentProps = {
  id: number;
  content: string;
  last_updated_time: string;
  reply_count?: number;
  member: MemberProps;
};

type MemberProps = {
  id: number;
  nickname: string;
  profile_image: string;
};

type CommentsProps = {
  message?: string;
  body: CommentsBodyProps;
};

type CommentsBodyProps = {
  comments: CommentProps[];
  total_count: number;
  has_more: boolean;
  last: number;
};

type LikeProps = {
  message: string;
  body: { is_liked: boolean };
};
