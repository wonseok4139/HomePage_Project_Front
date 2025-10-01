// PostForm.jsx (또는 PostWrite.jsx)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { insertBoard } from '../../api/boardService'; 
import './Board.css';

function PostWrite() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    try {
      const newPost = { title, author, content };
      // 백엔드 API에 POST 요청을 보냅니다.
      await insertBoard(newPost); 
      alert('게시글이 성공적으로 작성되었습니다!');
      navigate('/board'); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다:", error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="post-form-container">
      <h2>게시글 작성</h2>
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
        <button type="submit" className="submit-button">작성 완료</button>
      </form>
    </div>
  );
}

export default PostWrite;