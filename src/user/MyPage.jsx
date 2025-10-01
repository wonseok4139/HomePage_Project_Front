import { useNavigate } from 'react-router-dom';
import '../user/style/Login.css';
//import './style/MyPage.css'

const MyPage = () => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate('/mypage/update');
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?')) {
      navigate('/mypage/delete');
    }
  };

  return (
    <div className="contents">
      <div className="mypage-container">
        <h2 className="sub-tit">마이페이지</h2>
        <div className="button-group">
          <button className="btn-mypage btn-primary md" onClick={handleUpdateClick}>
            회원 정보 수정
          </button>
          <button className="btn-mypage btn-primary md" onClick={handleDeleteClick}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;