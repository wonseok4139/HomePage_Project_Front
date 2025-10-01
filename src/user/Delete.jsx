// src/user/Withdraw.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { withdrawMember } from '../api/memberService';
import { UserContext } from './UserContext';
import './style/Delete.css'; 

const Delete = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleWithdraw = async () => {
    // 경고창 대신 UI에서 사용자에게 최종 확인을 받습니다.
    // 이 함수는 '회원 탈퇴' 버튼에 직접 연결됩니다.
    
    if (!user?.userId) {
      alert('사용자 정보가 없습니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }

    try {
      await withdrawMember(user.userId);

      // 상태 초기화 및 로컬 스토리지 삭제
      setUser(null);
      localStorage.removeItem('user');

      alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
      navigate('/signin'); //  탈퇴 후 로그인 페이지로 이동하는 것이 더 자연스럽습니다.
    } catch (error) {
      console.error(error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="contents">
      <div className="withdraw-container">
        <h2 className="sub-tit">회원 탈퇴</h2>
        <div className="warning-box">
          <p>⚠️ 이 결정은 되돌릴 수 없습니다. ⚠️</p>
          <p>회원 탈퇴 시 모든 계정 정보와 데이터가 영구적으로 삭제됩니다.</p>
        </div>

        <div className="button-group">
          <button 
            className="btn-withdraw btn-danger md"
            onClick={handleWithdraw}>
            회원 탈퇴
          </button>
          <button 
            className="btn-cancel btn-secondary md" 
            onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;