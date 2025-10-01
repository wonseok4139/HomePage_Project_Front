import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBoard } from '../../api/boardService'; 

const BoardDelete = () => {
  // URL 파라미터에서 게시글 ID를 가져옵니다.
  const { id } = useParams();
  // 페이지 이동을 위한 훅을 사용합니다.
  const navigate = useNavigate();
  // 삭제 중 상태를 관리하여 중복 클릭을 방지합니다.
  const [isDeleting, setIsDeleting] = useState(false);

  // 게시글 삭제를 처리하는 비동기 함수입니다.
  const handleDeleteClick = async () => {
    // 삭제 여부를 사용자에게 확인 받습니다.
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      setIsDeleting(true);
      try {
        // 임포트한 deleteBoard API 함수를 호출하여 게시글을 삭제합니다.
        await deleteBoard(id);
        alert('게시글이 성공적으로 삭제되었습니다.');
        // 삭제 후 게시글 목록 페이지로 이동합니다.
        navigate('/board');
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>게시글 삭제</h2>
      <p>이 게시글을 삭제하시려면 아래 버튼을 눌러주세요.</p>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isDeleting ? 'not-allowed' : 'pointer',
          backgroundColor: isDeleting ? '#ccc' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {isDeleting ? '삭제 중...' : '게시글 삭제'}
      </button>
    </div>
  );
};

export default BoardDelete;