import { useState, useRef } from "react";
import AddressSearch from "./AddressSearch";
import { registerMember } from "../api/memberService";
import { useNavigate } from "react-router-dom";
import "./style/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userSubaddress: "",
  });

  const [errors, setErrors] = useState({});
  const subAddressRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.userId) newErrors.userId = "아이디를 입력해주세요.";
    if (!form.userName) newErrors.userName = "이름을 입력해주세요.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.userEmail) {
      newErrors.userEmail = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(form.userEmail)) {
      newErrors.userEmail = "올바른 이메일 주소를 입력해주세요.";
    }

    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!form.userPw) {
      newErrors.userPw = "비밀번호를 입력해주세요.";
    } else if (form.userPw.length < 8) {
      newErrors.userPw = "비밀번호는 8자리 이상이어야 합니다.";
    } else if (!specialCharRegex.test(form.userPw)) {
      newErrors.userPw = "비밀번호에 특수기호가 포함되어야 합니다.";
    }

    if (!form.userPhone) newErrors.userPhone = "휴대폰 번호를 입력해주세요.";
    if (!form.userSubaddress) newErrors.userSubaddress = "상세주소를 입력해주세요.";

    if (form.userPw && form.confirmPassword && form.userPw !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await registerMember(form);
      console.log("회원가입 성공!", response);
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

      navigate("/signin");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="contents">
      <div className="signup-container">
        <h2 className="sub-tit">
          🎈회원가입🎈
        </h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <p className="text-info align-right">
            <span className="asterisk">*</span>필수입력사항입니다.
          </p>

          {/* 아이디 */}
          <div className="form-group">
            <label htmlFor="userId">
              아이디<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="text"
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            {errors.userId && (
              <small className="text-error">{errors.userId}</small>
            )}
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="userName">
              이름<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="text"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
            {errors.userName && (
              <small className="text-error">{errors.userName}</small>
            )}
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label htmlFor="userEmail">
              이메일<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="email"
              id="userEmail"
              name="userEmail"
              value={form.userEmail}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
            />
            {errors.userEmail && (
              <small className="text-error">{errors.userEmail}</small>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label htmlFor="userPw">
              비밀번호<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="password"
              id="userPw"
              name="userPw"
              value={form.userPw}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.userPw && (
              <small className="text-error">{errors.userPw}</small>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              비밀번호 확인<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword || ""}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && (
              <small className="text-error">{errors.confirmPassword}</small>
            )}
          </div>

          {/* 주소 */}
          <div className="form-group">
            <label htmlFor="userAddress">주소</label>
            <div className="flex">
              <input
                className="input-text"
                type="text"
                id="userAddress"
                name="userAddress"
                value={form.userAddress}
                placeholder="주소를 검색하세요"
                disabled
              />
              <AddressSearch
                form={form}
                setForm={setForm}
                subAddressRef={subAddressRef}
              />
            </div>
            <input
              className="input-text"
              type="text"
              id="userSubaddress"
              name="userSubaddress"
              value={form.userSubaddress}
              onChange={handleChange}
              placeholder="상세주소를 입력하세요"
              ref={subAddressRef}
            />
            {errors.userSubaddress && (
              <small className="text-error">{errors.userSubaddress}</small>
            )}
          </div>

          {/* 휴대폰 */}
          <div className="form-group">
            <label htmlFor="userPhone">
              휴대폰<span className="asterisk">*</span>
            </label>
            <input
              className="input-text"
              type="tel"
              id="userPhone"
              name="userPhone"
              value={form.userPhone}
              onChange={handleChange}
              placeholder="숫자만 입력해주세요"
            />
            {errors.userPhone && (
              <small className="text-error">{errors.userPhone}</small>
            )}
          </div>

          <button className="btn-primary md" type="submit">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;