import React from 'react';
import './Contact.css';
// Font Awesome 아이콘 import
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaCommentDots,  FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">
        <span className="title-icon">✨</span> 문의 ✨
      </h2>
      <p className="contact-subtitle">
        공연, 레슨, 협업 문의는 언제든 환영합니다.
        <br /> 아래 연락처로 편하게 문의해주세요.
      </p>

      <div className="contact-info">
        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <span>서울시 ○○구 ○○로</span>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span>010-1234-5678</span>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>example@email.com</span>
        </div>
        <div className="contact-item">
          <FaCommentDots className="contact-icon" />
          <a href="https://open.kakao.com/o/xxxxx" target="_blank" rel="noopener noreferrer">
            Kakao 1:1 오픈채팅
          </a>
        </div>
        <div className="contact-item">
          <FaInstagram className="contact-icon" />
          <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
            @yourhandle
          </a>
        </div>
        <div className="contact-item">
          <FaFacebook className="contact-icon" />
          <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer">
            @yourhandle (Facebook)
          </a>
        </div>
      </div>

      {/* 추가: 간단한 문의 폼 (선택 사항, 필요시 주석 해제하여 사용) */}
      {/* <div className="contact-form-section">
        <h3 className="form-section-title">메시지 보내기</h3>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" placeholder="성함을 입력해주세요" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" placeholder="답변 받을 이메일 주소" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">메시지</label>
            <textarea id="message" name="message" rows="5" placeholder="궁금한 점이나 문의 내용을 남겨주세요"></textarea>
          </div>
          <button type="submit" className="submit-message-button">메시지 전송</button>
        </form>
      </div> */}
    </div>
  );
};

export default Contact;