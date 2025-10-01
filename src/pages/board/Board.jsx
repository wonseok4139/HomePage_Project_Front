// src/pages/board/Board.jsx

import React, { useState, useEffect } from 'react';
import './Board.css';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../api/boardService'; 

function Board() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 게시글 목록을 가져오는 함수
  const fetchPosts = async (search = '') => {
    try {
      const response = await getAllPosts(search);
      setPosts(response);
    } catch (error) {
      console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // ✨ 초기 렌더링 시 빈 검색어로 목록을 가져옵니다.
  }, []); // 의존성 배열을 빈 배열([ ])로 두어, 컴포넌트가 마운트될 때 한 번만 실행되게 합니다.

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchPosts(searchTerm); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="notice-container">
      <h2>게시판 목록</h2>
      <div className="search-box">
        <input 
          type="text" 
          onChange={handleSearchChange} 
          onKeyDown={handleKeyDown}
          className="SearchBoard" 
          placeholder="제목으로 검색..." 
          value={searchTerm}
        />
        <button 
          type="button" 
          onClick={handleSearch} 
          className="SearchBoardButton">
          찾기
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <span
                  className="post-title-link"
                  onClick={() => navigate(`/board/post/${post.id}`)}
                >
                  {post.title}
                </span>
              </td>
              <td>{post.author}</td>
              <td>
                {post.createDate ? new Date(post.createDate).toLocaleString() : '날짜 미정'}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/board/edit/${post.id}`)}
                >
                  수정
                </button>
                <button
                  className="delete-button"
                  onClick={() => navigate(`/board/boarddelete/${post.id}`)} 
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="write-button" onClick={() => navigate('/board/boardwrite')}>
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default Board;