// Header.jsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState, useContext } from 'react';
import './Header.css';
import logo from '../../images/LOGO.jpg';
import { UserContext } from '../../user/UserContext'; 

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  // useContext 훅을 사용해 전역 상태에서 user와 setUser를 가져옵니다.
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null); // 전역 user 상태를 null로 설정
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const keyword = searchKeyword.toLowerCase().trim();

    const routeKeywords = {
      '/history': ['경력', '스펙', '학벌', '학교', '콩쿨', '유학', '대학교', '석사', '박사'],
      '/program': ['프로그램', '강의', '커리큘럼', '수업'],
      '/place': ['위치', '오시는 길', '주소', '찾아오시는길', '장소'],
      '/reservation': ['예약', 'book', '예약하기', '예약좀', '예약 좀요'],
      '/video': ['영상', '비디오', '공연', '무대'],
      '/contact': ['연락', '문의', '전화', 'contact'],
      //'/board': ['질문', 'QnA'],
    };

    for (const path in routeKeywords) {
      if (routeKeywords[path].some(k => keyword.includes(k))) {
        navigate(path);
        setSearchKeyword('');
        setMenuOpen(false);
        return;
      }
    }

    alert(`'${searchKeyword}'에 대한 페이지를 찾을 수 없습니다.`);
    navigate('/');
    setSearchKeyword('');
    setMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link to="/" className="header-logo">
            <img src={logo} alt="로고" />
          </Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <ul ref={menuRef} className={`header-menu ${menuOpen ? 'open' : ''}`}>
            <li><Link className="header-nav-item" to="/history">경력</Link></li>
            <li><Link className="header-nav-item" to="/program">프로그램</Link></li>
            <li><Link className="header-nav-item" to="/place">위치</Link></li>
            <li><Link className="header-nav-item" to="/reservation">예약</Link></li>
            <li><Link className="header-nav-item" to="/video">영상</Link></li>
            <li><Link className="header-nav-item" to="/contact">연락</Link></li>
            {/* <li><Link className="header-nav-item" to="/board">게시판</Link></li> */}

            {/* user 객체에 값이 있으면(로그인 상태) 마이페이지/로그아웃 버튼을,
                없으면(로그아웃 상태) 로그인/회원가입 버튼을 보여줍니다. */}
            {user ? (
              <>
                <li><Link className="header-nav-item" to="/Board">게시판</Link></li>
                <li><Link className="header-nav-item" to="/mypage">마이페이지</Link></li>
                <li><button className="header-nav-item logout-btn" onClick={handleLogout}>로그아웃</button></li>
              </>
            ) : (
              <>
                <li><Link className="header-nav-item" to="/signin">로그인</Link></li>
                <li><Link className="header-nav-item" to="/signup">회원가입</Link></li>
              </>
            )}
          </ul>
        </div>
        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="페이지 검색..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button type="submit">검색</button>
        </form>
      </div>
    </header>
  );
};

export default Header;