import React from 'react';
import './History.css';

// ✨ 새로운 CareerItem 컴포넌트 추가 ✨
const CareerItem = ({ year, title, description, icon, isLast }) => {
  return (
    <li className={`career-item ${isLast ? 'last-item' : ''}`}> {/* 마지막 아이템에 클래스 추가 */}
      <div className="timeline-dot"></div>
      <div className="career-year-container"> {/* 연도 컨테이너 추가 */}
        <span className="career-year">{year}</span>
      </div>
      <div className="career-content">
        <h3>
          {icon && <span className="career-icon">{icon}</span>} {/* 아이콘 표시 */}
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

const History = () => {
  const careerList = [
    {
      year: '2023',
      title: '독일 베를린 오페라 워크숍',
      description: '국제 마스터클래스 참가 및 솔리스트 공연',
      icon: '🎓', // 아이콘 추가
    },
    {
      year: '2021',
      title: '국립오페라단 무대 데뷔',
      description: '<피가로의 결혼> 바르톨로 역 출연',
      icon: '🎭', // 아이콘 추가
    },
    {
      year: '2020',
      title: '서울대학교 성악과 졸업',
      description: '리릭 바리톤 전공, 정기 연주회 리더 출연',
      icon: '🎵', // 아이콘 추가
    },
    {
      year: '2018',
      title: 'Overture 음악회 데뷔',
      description: '첫 독창회 무대, 클래식 가곡 프로그램',
      icon: '🎤', // 아이콘 추가 (예시)
    },
  ];

  return (
    <div className="history-container">
      <h2 className="history-title">
        <span className="title-icon">🎼</span> 경력
      </h2>
      <p className="history-subtitle">성악가 이원석의 무대 위 여정</p>

      <ul className="career-list">
        {careerList.map((item, index) => (
          <CareerItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            icon={item.icon}
            isLast={index === careerList.length - 1} // 마지막 아이템인지 여부 전달
          />
        ))}
      </ul>
    </div>
  );
};

export default History;