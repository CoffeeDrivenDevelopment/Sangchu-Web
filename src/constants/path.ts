const API_PATH = {
  LOCATION: '/member-service/v1/profile',
  RECOMMEND: {
    INGREDIENTS: '/recipe-service/v1/ingredients',
    RECIPE: '/recipe-service/v1/recipes',
  },
  RECIPE: {
    LIST: '/recipe-service/v1/recipes/search',
    MOVIES: '/recipe-service/v1/recipes/movies',
    LIKE: '/recipe-service/v1/recipes/:recipe_id/likes',
    REVIEW: '/recipe-service/v1/recipes/:recipe_id/reviews',
    REVIEW_RUD: '/recipe-service/v1/reviews/:review_id',
    REVIEW_LIKE: '/recipe-service/v1/reviews/:review_id/like',
    REVIEW_DISLIKE: '/recipe-service/v1/reviews/likes/:like_id',
    COMMENTS: '/recipe-service/v1/comments/recipes/:recipe_id',
    COMMENT_C: '/recipe-service/v1/comments/recipes',
    COMMENT_UD: '/recipe-service/v1/comments/:comment_id',
    REPLY_COMMENTS: '/recipe-service/v1/comments/:comment_id/reply',
    DETAIL: '/recipe-service/v1/recipes/:recipe_id',
  },
  INGREDIENT: {
    CATEGORIES: '/recipe-service/v1/ingredients/categories',
    RANK: '/recipe-service/v1/ingredients/popular',
    ASC: '/recipe-service/v1/ingredients/rank/asc',
    DESC: '/recipe-service/v1/ingredients/rank/desc',
    LIST: '/recipe-service/v1/ingredients/search',
    DETAIL: '/recipe-service/v1/ingredients/:id',
    GRAPH: {
      ONLINE: '/recipe-service/v1/ingredients/:id/prices/online',
      OFFLINE: '/recipe-service/v1/ingredients/:id/prices/offline',
    },
    MARKET: {
      ONLINE: '/recipe-service/v1/ingredients/:id/markets/online/details',
      OFFLINE: '/recipe-service/v1/ingredients/:id/markets/offline/details',
    },
    REPORT: {
      INFO: '/recipe-service/v1/ingredients/:id/cause',
      ONLINE: '/recipe-service/v1/ingredients/:id/markets/prices/online',
      OFFLINE: '/recipe-service/v1/ingredients/:id/markets/prices/offline',
      PREDICT: '/recipe-service/v1/ingredients/:id/prices/predicted',
      RESONABLE: '/recipe-service/v1/ingredients/:id/prices/reasonable',
      TARGET_PRICE: '/recipe-service/v1/ingredients/:id/prices/target',
    },
  },
};

export default API_PATH;
