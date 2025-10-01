import React from 'react';
import './Program.css';
import ProgramShop from './ProgramShop';

// ✨ 새로운 ProgramCard 컴포넌트 추가 ✨
const ProgramCard = ({ title, duration, price, description, icon }) => {
  return (
    <div className="program-card">
      <h3 className="program-name">
        {icon && <span className="program-icon">{icon}</span>} {/* 아이콘 표시 */}
        {title}
      </h3>
      <p className="program-detail">
        <span className="detail-icon">⏱</span> {duration}
      </p>
      <p className="program-detail program-price"> {/* 가격에 별도 클래스 추가 */}
        <span className="detail-icon">💰</span> {price}
      </p>
      <p className="program-description">{description}</p>
      {/* <button className="program-button">상담 신청</button> */ /* 필요시 버튼 추가 */ }
    </div>
  );
};

const Program = () => {
  const programs = [
    {
      title: '전공 레슨',
      duration: '1회 50분',
      price: '₩150,000',
      description: '성악 전공자 및 입시생을 위한 집중 트레이닝. 호흡, 발성, 아리아 해석 중심.',
      icon: '🎓', // 아이콘 별도 속성으로 분리
    },
    {
      title: '취미 레슨',
      duration: '1회 50분',
      price: '₩80,000',
      description: '노래를 사랑하는 분들을 위한 취미반. 자세, 발음, 기초 발성부터 차근차근.',
      icon: '🎶', // 아이콘 별도 속성으로 분리
    },
    {
      title: '입시 컨설팅 패키지',
      duration: '총 5회 + 모의 실기 피드백',
      price: '₩650,000',
      description: '입시 준비생 전용. 프로그램 설계부터 무대 시뮬레이션까지 전반적인 관리.',
      icon: '🌱', // 아이콘 별도 속성으로 분리
    },
    {
      title: '단기 특강', // 추가 예시 프로그램
      duration: '1회 90분',
      price: '₩120,000',
      description: '특정 주제에 대한 심화 학습. (예: 오페라 아리아 발음, 딕션 집중)',
      icon: '💡',
    },
  ];

  return (
    <div className="program-container">
      <h2 className="program-title">
        <span className="title-icon">🗓️</span> 레슨 프로그램 안내
      </h2>
      <p className="program-subtitle">당신의 목소리에 맞는 맞춤형 프로그램을 선택해보세요.</p>
      <div className="program-list">
        {programs.map((item, index) => (
          <ProgramCard
            key={index}
            title={item.title}
            duration={item.duration}
            price={item.price}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
      <ProgramShop/>
    </div>
  );
};

export default Program;