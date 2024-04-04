import axios from 'axios';

// 개발 중에는 api 요청시 포트번호 확인 필요
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

// AT와 RT 요청 인터셉터
api.interceptors.request.use(function (config) {
  const access_token = localStorage.getItem('access_token');

  // 토큰이 있고, 요청에 헤더가 있는 경우
  if (config.headers && access_token) {
    const access_token = localStorage.getItem('access_token');
    config.headers['Authorization'] = `Bearer ${access_token}`;
    console.log();

    return config;
  }
  return config;
});

// AT 만료 시 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    // 오류가 발생한 요청의 설정 저장
    const originalConfig = err.config;

    // 오류가 발생하고, 응답 상태 코드가 401(Unauthorized)인 경우
    if (err.response && err.response.status === 401) {
      try {
        const member_id = localStorage.getItem('member_id');
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth-service/v1/refresh`,
          { member_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
            },
          },
        );

        console.log('토큰 갱신 확인', response.data);
        const access_token = response.data.body.access_token;
        const refresh_token = response.data.body.refresh_token;
        console.log('갱신 rt 확인', response.data.body.refresh_token);
        // 갱신된 토큰 저장
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', access_token);

        // 토큰 갱신 후 재요청
        return await api.request(originalConfig);
      } catch (err) {
        console.log('토큰 갱신 에러');
        // 로그인 페이지로 연결
        window.location.href = '/login';
      }
      // 토큰 갱신에 실패한 경우.
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default api;
