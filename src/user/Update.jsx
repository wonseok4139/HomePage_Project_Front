import React, { useState, useEffect, useContext, useRef } from "react";
import { getMemberInfo, modifyMember } from "../api/memberService";
import AddressSearch from '../user/AddressSearch';
import { UserContext } from './UserContext'; 
import { Navigate, useNavigate } from 'react-router-dom';
import './style/Update.css'
const Update = () => {
  const { user,setUser } = useContext(UserContext);
  const [memberData, setMemberData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userSubaddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const subAddressRef = useRef(null);

  useEffect(() => {
    const MemberInfo = async () => {
      try {
        setLoading(true);
        console.log(user);
        // userId가 유효한지 확인 후 API 호출
        if (user && user.userId) {
         // const getMember = await getMemberInfo(user.userId);
          
          setMemberData({
            userId: user.userId || "",
            userPw: "", // 비밀번호는 초기화 상태로 두는 것이 올바른 동작입니다.
            userName: user.userName || "",
            userEmail: user.userEmail || "",
            userPhone: user.userPhone || "",
            userAddress: user.userAddress || "",
            userSubaddress: user.userSubaddress || "",
          });
          setError(null);
        }
      } catch (e) {
        setError("회원 정보를 불러오는 데 실패했습니다.");
        console.error("회원 정보 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    MemberInfo();
  }, []); // 의존성 배열에 user를 추가하여 user 객체가 변경될 때마다 재실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevMemberData) => ({ ...prevMemberData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const memberDataToSend = { ...memberData };
      if (memberDataToSend.userPw.trim() === "") {
        delete memberDataToSend.userPw;
      }
      
      await modifyMember(memberDataToSend);
      const updatedUser = {
      ...user, // 기존 user 정보를 유지
      ...memberDataToSend, // 수정된 데이터로 덮어쓰기
    };

    // 3. UserContext의 상태를 업데이트합니다.
    setUser(updatedUser); 
    
    // 4. 로컬 스토리지에 새로운 사용자 정보를 저장합니다.
    localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess(true);
      alert("회원수정이 완료되었습니다!!")
      navigate("/")
    } catch (e) {
      setError("회원 정보 수정에 실패했습니다. 다시 시도해 주세요.");
      console.error("회원 정보 수정 실패:", e);
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="contents">
      <div className="update-container">
        <h2 className="sub-tit">회원 정보 수정</h2>
        {success && <div className="success-message">🎉 회원 정보가 성공적으로 수정되었습니다!</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디:</label>
            <input
              className="input-text"
              type="text"
              name="userId"
              value={memberData.userId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>이메일:</label>
            <input
              className="input-text"
              type="email"
              name="userEmail"
              value={memberData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>이름:</label>
            <input
              className="input-text"
              type="text"
              name="userName"
              value={memberData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>전화번호:</label>
            <input
              className="input-text"
              type="text"
              name="userPhone"
              value={memberData.userPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>주소:</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                className="input-text"
                type="text"
                name="userAddress"
                value={memberData.userAddress}
                readOnly
              />
              <AddressSearch
                form={memberData}
                setForm={setMemberData}
                subAddressRef={subAddressRef}
              />
            </div>
            <input
              className="input-text"
              type="text"
              name="userSubaddress"
              value={memberData.userSubaddress}
              onChange={handleChange}
              placeholder="상세 주소"
              style={{ marginTop: "10px" }}
              ref={subAddressRef}
            />
          </div>
          <div className="form-group">
            <label>비밀번호:</label>
            <input
              className="input-text"
              type="password"
              name="userPw"
              value={memberData.userPw}
              onChange={handleChange}
              placeholder="변경 시에만 입력"
            />
          </div>
          <button type="submit" className="btn-update md" disabled={loading}>
            {loading ? '수정 중...' : '수정하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;