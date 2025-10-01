import axios from "axios";

// 게시판 API를 위한 Axios 인스턴스
const boardAxios = axios.create({
  baseURL: "/api/boards",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 로그만 남기고 토큰 로직 제거
boardAxios.interceptors.request.use(
  (config) => {
    console.log("요청 인터셉터:", config);
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 오류 처리 로직만 남김
boardAxios.interceptors.response.use(
  (response) => {
    console.log("응답 인터셉터 성공:", response);
    return response;
  },
  (error) => {
    const { response, request } = error;

    if (response) {
      const { status, data } = response;
      switch (status) {
        case 400:
          console.error(`Bad Request: ${data?.message || "유효하지 않은 요청입니다."}`);
          break;
        case 404:
          console.error("Not Found: 요청한 페이지를 찾을 수 없습니다.");
          break;
        case 500:
          console.error("Internal Server Error: 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          console.error(`오류 발생: ${data?.message || "알 수 없는 오류"}`);
          break;
      }
    } else if (request) {
      console.error("네트워크 연결 문제 발생.");
    } else {
      console.error("알 수 없는 요청 오류 발생.");
    }

    return Promise.reject(error);
  }
);

export default boardAxios;