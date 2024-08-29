import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // 백엔드 서버의 기본 URL
});

// 요청 인터셉터 설정
api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `${accessToken}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
