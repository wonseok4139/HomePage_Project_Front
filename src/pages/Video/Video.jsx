import { useState } from 'react';
import './Video.css';

const Video = () => {
  console.log("Video 컴포넌트 렌더링 중!");

  // --- 유튜브 영상 관련 상태와 함수는 그대로 유지합니다. ---
  const [portfolioVideos, setPortfolioVideos] = useState([
    {
      title: '오페라 <라보엠> 하이라이트',
      // ✨ 중요: 이 URL들을 실제 유튜브 임베드 URL로 변경해주세요. ✨
      // 예시: https://www.youtube.com/embed/VIDEO_ID25
      // 유튜브 영상 페이지에서 '공유' -> '퍼가기' 클릭 후 iframe 태그의 'src' 값을 복사하여 붙여넣으세요.
      url: 'https://www.youtube.com/embed/S2qKzQk0b0g', // 실제 URL 예시: https://www.youtube.com/embed/영상ID
      like: 0,
      dislike: 0,
    },
    {
      title: '오페라 <사랑의 묘약> 연주 영상',
      url: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8RQ2zBMk2kS0xK8_0k0_0g',
      like: 0,
      dislike: 0,
    },
    {
      title: '오페라 <피가로의 결혼> 연주 영상',
      url: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8RQ2zBMk2kS0xK8_0k0_0g',
      like: 0,
      dislike: 0,
    },
    {
      title: '오페라 <리골렛토> 연주 영상',
      url: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8RQ2zBMk2kS0xK8_0k0_0g',
      like: 0,
      dislike: 0,
    },
  ]);

  const addVideoLike = (index) => {
    const newPortfolioVideos = [...portfolioVideos];
    newPortfolioVideos[index].like += 1;
    setPortfolioVideos(newPortfolioVideos);
  };

  const minusVideoDislike = (index) => {
    const newPortfolioVideos = [...portfolioVideos];
    newPortfolioVideos[index].dislike += 1;
    setPortfolioVideos(newPortfolioVideos);
  };

  const initSingleVideoLikes = (indexToReset) => {
    const newPortfolioVideos = portfolioVideos.map((video, index) => {
      if (index === indexToReset) {
        return {
          ...video,
          like: 0,
          dislike: 0
        };
      }
      return video;
    });
    setPortfolioVideos(newPortfolioVideos);
  };

  const initAllPortfolioVideoLikes = () => {
    const resetVideos = portfolioVideos.map(video => ({
      ...video,
      like: 0,
      dislike: 0
    }));
    setPortfolioVideos(resetVideos);
  };


  // --- 레퍼토리 목록은 변경 없이 유지합니다. ---
  const songList = [
    'Don Giovanni - Deh vieni alla finestra',
    'Don carlo -  O Carlo, ascolta... Ah! io morrò ',
    'Così fan tutte - Rivolgete a lui lo sguardo',
    'Le Nozze di Figaro - Hai già vinta la causa',
  ];

  return (
    <div className="video-page">
      {/* '연주 영상' 섹션 */}
      <h2 className="section-title">
        <span className="title-icon">🎥</span> 연주 영상
      </h2>
      <p className="section-subtitle">다양한 무대에서의 연주 영상을 감상해보세요.</p> {/* 서브타이틀 추가 */}
      <div className="video-section">
        {portfolioVideos.map((item, index) => (
          <div key={index} className="video-card">
            <iframe
              src={item.url}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade" /* 보안 정책 추가 */
            ></iframe>
            <p className="video-title">{item.title}</p>
            <div className="like-dislike-section">
              <span onClick={() => addVideoLike(index)}>👍</span> {item.like}  
              <span onClick={() => minusVideoDislike(index)}>👎</span> {item.dislike}
            </div>
            {/* 각 영상 카드 내에 개별 초기화 버튼 */}
            <button
              className="reset-single-video-button"
              onClick={() => initSingleVideoLikes(index)}
            >
              이 영상 초기화
            </button>
          </div>
        ))}
      </div>
      {/* 연주 영상 섹션의 전체 초기화 버튼 */}
      <button className="reset-button" onClick={initAllPortfolioVideoLikes}>모든 영상 좋아요/싫어요 초기화</button>


      {/* '레퍼토리 목록' 섹션 */}
      <h2 className="section-title">
        <span className="title-icon">🎵</span> 레퍼토리 목록
      </h2>
      <p className="section-subtitle">주요 오페라 아리아 및 가곡 레퍼토리입니다.</p> {/* 서브타이틀 추가 */}
      <ul className="repertoire-list">
        {songList.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default Video;