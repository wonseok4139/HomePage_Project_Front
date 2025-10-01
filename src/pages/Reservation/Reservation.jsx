import React, { useState } from 'react';
import './Reservation.css'; // 스타일 따로 관리할 예정이라면

export default function Reservation() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 서버에 데이터 전송하는 로직 대신 임시 alert
    alert(`예약자: ${name}\n날짜: ${date}\n메모: ${message || '없음'}\n\n예약이 접수되었습니다!`);

    // 폼 초기화
    setName('');
    setDate('');
    setMessage('');

    // ✨ 중요: 실제 배포 시에는 여기에 서버로 데이터를 전송하는 코드를 작성해야 합니다.
    // fetch('/api/reservations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name, date, message }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('예약이 성공적으로 완료되었습니다!');
    //   // 폼 초기화 등
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    // });
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">
        <span className="title-icon">📅</span> 레슨 예약하기
      </h2>
      <p className="reservation-subtitle">
        희망하는 레슨 날짜와 내용을 남겨주시면 빠르게 연락드리겠습니다.
      </p>

      <form onSubmit={handleSubmit} className="reservation-form-card"> {/* 새로운 클래스명 */}
        <div className="form-group"> {/* 각 입력 필드 그룹화 */}
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
            placeholder="성함을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">예약 희망 날짜:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">문의 내용 및 메모:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5" /* 텍스트 에어리어 높이 조정 */
            className="form-input"
            placeholder="예약하시려는 레슨 종류, 궁금한 점 등을 자유롭게 남겨주세요."
          />
        </div>

        <button type="submit" className="submit-button"> {/* 클래스명 변경 */}
          예약 요청 보내기
        </button>
      </form>
    </div>
  );
}