import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 주소
  headers: { "Content-Type": "application/json" },
});

// 모든 요청에 JWT 토큰을 자동 포함시키기 위해 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 로그인 시 저장된 JWT 읽기

  // 토큰이 존재하면 Authorization 헤더에 Bearer 형식으로 추가
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // 수정된 config 반환 → 요청 진행
});

export default api;
