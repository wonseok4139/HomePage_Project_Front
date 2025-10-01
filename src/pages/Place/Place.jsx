import React from 'react';
import './Place.css';

// ✨ 새로운 PlaceInfoCard 컴포넌트 추가 ✨
const PlaceInfoCard = ({ icon, title, description }) => {
  return (
    <div className="place-card">
      <h3>
        {icon && <span className="card-icon">{icon}</span>} {/* 아이콘 표시 */}
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
};

const Place = () => {
  const infoData = [
    {
      icon: '🏢',
      title: '레슨 장소',
      description: '서울특별시 강남구 테헤란로 123, 클래식타워 5층',
    },
    {
      icon: '🚇',
      title: '지하철 이용',
      description: '2호선 강남역 3번 출구 도보 5분 거리',
    },
    {
      icon: '🚌',
      title: '버스 이용',
      description: '147, 341, 360, 740번 / 강남역 하차',
    },
    {
      icon: '🅿️', // 주차 아이콘 추가 예시
      title: '주차 정보',
      description: '건물 지하 주차장 이용 가능 (1시간 무료)',
    },
  ];

  return (
    <div className="place-container">
      <h2 className="place-title">
        <span className="title-icon">📍</span> 오시는 길
      </h2>
      <p className="place-subtitle">아래 정보를 참고하여 편하게 방문해주세요.</p>

      <div className="place-info">
        {infoData.map((item, index) => (
          <PlaceInfoCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className="map-wrapper">
        <h3 className="map-title">📌 찾아오시는 길 지도</h3>
        <iframe
          title="map"
          // !!! 중요: 실제 구글 지도 임베드 URL로 변경해주세요. !!!
          // 구글 지도에서 주소를 검색 -> '공유' -> '지도 퍼가기' 에서 HTML을 복사하여 src 값만 붙여넣으세요.
          // 예: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.70773950669!2d127.0287813156641!3d37.50298197980996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3f938c41461%3A0x7e83e9d8e78f9e61!2z7JqV64-Z64yA!5e0!3m2!1sko!2skr!4v1678901234567!5m2!1sko!2skr
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.70773950669!2d127.0287813156641!3d37.50298197980996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3f938c41461%3A0x7e83e9d8e78f9e61!2z7JqV64-Z64yA!5e0!3m2!1sko!2skr!4v1678901234567!5m2!1sko!2skr"
          width="100%"
          height="450" /* 지도 높이 증가 */
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" /* 보안 정책 추가 */
        ></iframe>
      </div>
    </div>
  );
};

export default Place;