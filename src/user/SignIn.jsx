// SignIn.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../api/memberService";
import "./style/Login.css";
import { UserContext } from '../user/UserContext';

// setUser를 props로 받지 않고, 그냥 빈 괄호로 둡니다.
const SignIn = () => {
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [userId, setUserid] = useState("");
  const [userPw, setUserpw] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // useContext 훅을 사용해 UserContext에서 setUser 함수를 가져옵니다.
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    try {
      // loginMember 함수에 userId와 userPw를 전달합니다.
      const data = await loginMember({userId, userPw});
      const { accessToken, refreshToken, user } = data;

      // 로컬 스토리지에 토큰과 사용자 데이터를 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // setUser 함수를 호출하여 전역 user 상태를 업데이트
      setUser(user);

      console.log("로그인 성공:", data);
      setLoginSuccess("로그인에 성공했습니다!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            setLoginError("입력값이 올바르지 않습니다. 다시 확인해주세요.");
            break;
          case 401:
            setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
            break;
          case 404:
            setLoginError("존재하지 않는 계정입니다.");
            break;
          default:
            setLoginError("로그인 중 알 수 없는 오류가 발생했습니다.");
            break;
        }
      } else if (error.request) {
        setLoginError("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      } else {
        setLoginError("로그인 중 예기치 않은 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="contents">
      <div className="login-container">
        <h2 className="sub-tit">
          환영합니다🎉<br />로그인 하세요!
        </h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">아이디</label>
            <input
              className="input-text"
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPw">비밀번호</label>
            <div className="input-group">
              <input
                className="input-text"
                type={passwordShow ? "text" : "password"}
                id="userPw"
                value={userPw}
                onChange={(e) => setUserpw(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                className="btn"
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button className="btn-primary md" type="submit">
            로그인
          </button>
          {loginError && <p className="text-error">{loginError}</p>}
          {loginSuccess && <p className="text-success">{loginSuccess}</p>}
        </form>

        <ul className="login-link">
          <li>
            <span>아직 회원이 아니신가요?</span>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <span>아이디/비밀번호를 잊으셨나요?</span>
            <Link to="/find-account">아이디/비밀번호 찾기</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SignIn;