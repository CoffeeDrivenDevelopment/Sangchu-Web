/*
[사용 예시]
API_PATH.COMMENT = '/api/v1/users/:userId/posts/:postId/comments'
const pathParams = { userId: 'user123', postId: 'post456' }; < 순서 중요!!
const queryParams = { sort: 'date', page: '2', limit: '10' }; < 순서 안 중요
const resultUrl = buildUrl(API_PATH.COMMENT, pathParams, queryParams); 
*/

function buildUrl(baseUrl: string, pathParams?: object, queryParams?: object) {
  // 패스 변수 처리
  let url = baseUrl;

  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    }
  }

  // 쿼리 파라미터 처리
  if (queryParams) {
    const queryStrings = Object.entries(queryParams).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
    url += `?${queryStrings.join('&')}`;
  }

  return url;
}

export default buildUrl;
