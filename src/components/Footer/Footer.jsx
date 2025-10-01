import '../Footer/downcut.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* 컬럼 1 */}
        <div className="footer-column">
          <h4>소개</h4>
          <ul>
            <li>프로필</li>
            <li>학력</li>
            <li>경력</li>
            <li>공연 이력</li>
            <li>수상 내역</li>
          </ul>
        </div>

        {/* 컬럼 2 */}
        <div className="footer-column">
          <h4>콘텐츠</h4>
          <ul>
            <li>공연 영상</li>
            <li>음원 링크</li>
            <li>보도 자료</li>
            <li>포트폴리오 PDF</li>
          </ul>
        </div>

        {/* 컬럼 3 */}
        <div className="footer-column">
          <h4>문의</h4>
          <ul>
            <li>레슨 문의</li>
            <li>공연 섭외</li>
            <li>이메일 문의</li>
            <li>인스타그램 DM</li>
          </ul>
        </div>

        {/* 컬럼 4 */}
        <div className="footer-column">
          <h4>SNS</h4>
          <ul>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Facebook</li>
            <li>SoundCloud</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 이원석 | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
