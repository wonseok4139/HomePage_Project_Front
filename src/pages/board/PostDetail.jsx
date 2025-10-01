import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css'; // Notice.css를 재사용하거나 필요에 따라 PostDetail.css를 만들 수 있습니다.

function PostDetail() {
  const [post, setPost] = useState(null); // 단일 게시글 정보를 저장할 상태
  const { id } = useParams(); // URL에서 게시글 ID를 가져옵니다. (예: /board/123 -> id는 123)
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  useEffect(() => {
    // 컴포넌트가 마운트되거나 ID가 변경될 때 게시글을 불러옵니다.
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/boards/${id}`);
        setPost(response.data); // 불러온 게시글 데이터를 상태에 저장
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 중 오류가 발생했습니다:", error);
        setPost(null); // 오류 발생 시 게시글 상태를 초기화
      }
    };

    if (id) { // ID가 유효할 때만 API 호출
      fetchPost();
    }
  }, [id]); // id가 변경될 때마다 useEffect가 다시 실행됩니다.

  // 게시글 데이터가 로딩 중이거나 없을 때 보여줄 내용
  if (!post) {
    return (
      <div className="notice-container">
        <h2>게시글 로딩 중... 또는 게시글을 찾을 수 없습니다.</h2>
        <div className="button-container">
          <button className="write-button" onClick={() => navigate('/board')}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-container"> {/* 기존 Notice.css 스타일을 활용 */}
      <h2>게시글 상세 보기</h2>
      <div className="post-detail-card"> {/* 상세 내용을 감싸는 카드 스타일 */}
        <p><strong>제목:</strong> {post.title}</p>
        <p><strong>작성자:</strong> {post.author}</p>
        <p><strong>작성일:</strong> {post.createDate ? new Date(post.createDate).toLocaleString() : '날짜 미정'}</p>
        <hr /> {/* 구분선 */}
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="button-container">
        <button className="write-button" onClick={() => navigate('/board')}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default PostDetail;