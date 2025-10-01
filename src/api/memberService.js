import memberApi from "./memberApi";

// 회원가입
export const registerMember = async (memberData) => {
  const response = await memberApi.post("/register", memberData);
  return response.data;
};

// 로그인
// 매개변수를 하나의 객체로 받도록 수정
export const loginMember = async (credentials) => {
  // credentials 객체에서 userId와 userPw를 구조 분해 할당
  const { userId, userPw } = credentials; 
  
  const response = await memberApi.post("/login",{userId, userPw });
  
  // 로그인 성공 시 토큰 로컬 스토리지 저장
  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  
  return response.data;
};

// 회원 정보 조회
export const getMemberInfo = async (userId) => {
  const response = await memberApi.get(`/${userId}`);
  return response.data;
};

// 회원 정보 수정
export const modifyMember = async (memberData) => {
  const response = await memberApi.put("/modify", memberData);
  return response.data;
};

// 회원 탈퇴
export const withdrawMember = async (userId) => {
  const response = await memberApi.delete(`/delete/${userId}`);
  return response.data;
};
