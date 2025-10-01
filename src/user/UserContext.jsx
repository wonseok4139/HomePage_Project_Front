// src/UserContext.js
import { createContext, useState, useEffect } from 'react';

// Context를 생성합니다.
export const UserContext = createContext(null);

// 모든 하위 컴포넌트에 상태를 제공하는 Provider 컴포넌트입니다.
export const UserProvider = ({ children }) => {
  //  1. useState의 초기값에 로컬 스토리지 로딩 로직을 넣습니다.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      return null;
    }
  });

  //  2. user 상태가 변경될 때만 로컬 스토리지에 저장/삭제하는 로직을 남깁니다.
  useEffect(() => {
    if (user) {
      // user 객체가 변경될 때만 setItem을 호출하도록 로직 최적화
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};