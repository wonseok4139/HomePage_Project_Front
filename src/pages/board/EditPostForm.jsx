import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css'; // Notice.css의 스타일을 재활용합니다.

function EditPostForm() {
  const { id } = useParams(); // URL에서 게시글 ID를 가져옵니다.
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트될 때 게시글 데이터를 불러옵니다.
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}`);
        const post = response.data;
        setTitle(post.title);
        setAuthor(post.author);
        setContent(post.content);
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/notice'); // 오류 발생 시 목록으로 돌아갑니다.
      }
    };

    fetchPost();
  }, [id, navigate]); // id나 navigate가 변경될 때 다시 불러오도록 의존성 추가

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    try {
      const updatedPost = { title, author, content };
      // 백엔드 수정 API에 PUT 요청을 보냅니다.
      await axios.put(`/api/boards/${id}`, updatedPost);
      alert('게시글이 성공적으로 수정되었습니다!');
      navigate('/board'); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생했습니다:", error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="loading-message">게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="post-form-container"> 
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">작성자</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">수정 완료</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/board')}>취소</button>
      </form>
    </div>
  );
}

export default EditPostForm;