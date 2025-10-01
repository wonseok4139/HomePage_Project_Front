import axios from "axios";

// Axios 인스턴스 생성
const memberApi = axios.create({
  baseURL: "/api/members", // 백엔드 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (토큰 자동 첨부, 필요 시)
memberApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default memberApi;
