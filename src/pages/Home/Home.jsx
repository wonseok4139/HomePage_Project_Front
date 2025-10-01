import React from 'react';
import './Home.css';
import img1 from '../../images/img1.jpg'; // 프로필 이미지
// ✨ 히어로 섹션 배경 이미지 추가 (예시, 실제 이미지 경로로 변경) ✨
import heroBg from '../../images/Gemini_Generated_Image_dcj875dcj875dcj8.png' // 예시: 메인 히어로 섹션 배경 이미지

function Home() {
  // ✨ Hero 배경 이미지 URL을 변수로 직접 정의합니다. ✨
  //const heroBg= 'http://googleusercontent.com/image_collection/image_retrieval/13880993107946065834_0';
  return (
    <div className="home-container">
      {/* Hero 섹션 */}
      {/* 배경 이미지를 CSS에서 제어하기 위해 style 속성으로 전달 */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"> {/* 배경 이미지 위에 오버레이 추가 */}
          <h1 className="main-title">
            <span className="accent-text">Einladung</span>
          </h1>
          <p className="subtitle-line">감동을 전하는 성악가</p>
          <p className="subtitle-line">이원석입니다</p>
          {/* 필요시 버튼 추가 */}
          {/* <button className="hero-button">레슨 문의하기</button> */}
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="home-introduce">
        <div className="introduce-img-wrapper"> {/* 이미지 감싸는 div 추가 */}
          <img src={img1} alt="이원석 프로필" className="home-introduce-img" />
        </div>

        <div className="introduce-text-content"> {/* 텍스트 내용을 감싸는 div 추가 */}
          <h2>
            <strong>이원석</strong> <span className="role accent-text">/ 성악가</span>
          </h2>
          <p className="description">
            풍부한 경험과 실력으로,<br />
            화려한 테크닉과 탄탄한 호흡으로,<br />
            <span className="accent-text">든든한 지도자가 되겠습니다.</span> {/* 강조 텍스트 */}
          </p>

          <table className="info-table">
            <tbody>
              <tr>
                <th><span className="table-icon">🏠</span> 주소</th>
                <td>서울시 금천구 가산동 121-3번지</td>
              </tr>
              <tr>
                <th><span className="table-icon">📞</span> 연락처</th>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <th><span className="table-icon">📧</span> 이메일</th>
                <td>example@email.com</td>
              </tr>
              <tr>
                <th><span className="table-icon">🎓</span> 최종학력</th>
                <td>서울대학교 성악과 졸업 + 모짜르테움 오페라 석사 졸업</td>
              </tr>
              <tr>
                <th><span className="table-icon">🏆</span> 국제콩쿨</th>
                <td>엘리자베스 국제콩쿨 수상</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* Footer는 이미 잘 되어 있으니 Home.jsx에서 직접 렌더링하지 않아도 App.js에서 공통으로 렌더링하면 됩니다. */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;