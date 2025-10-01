// src/App.js

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/Appstyle/App.css'; // 스타일
import { UserProvider, UserContext } from './user/UserContext.jsx'; 

// 페이지 컴포넌트
import Home from './pages/Home/Home.jsx';
import Place from './pages/Place/Place.jsx';
import Reservation from './pages/Reservation/Reservation.jsx';
import Program from './pages/Program/Program.jsx';
import History from './pages/History/History.jsx';
import Header from './components/Header/Header.jsx';
import Video from './pages/Video/Video.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import Board from './pages/board/Board.jsx';
import PostWrite from './pages/board/PostWrite.jsx';
import EditPostForm from './pages/board/EditPostForm.jsx';
import PostDetail from './pages/board/PostDetail.jsx';
import BoardDelete from './pages/board/BoardDelete.jsx';
import SignIn from './user/SignIn.jsx';
import SignUp from './user/SignUp.jsx';
import MyPage from './user/MyPage.jsx';
import Update from './user/Update.jsx';
import Delete from './user/Delete.jsx';


const App = () => {



return (
    // <UserProvider>로 전체 앱을 감싸서 로그인 상태를 전역으로 공유합니다.
    <UserProvider>
        <BrowserRouter>
            <div className="app-wrapper">
                {/* 로그인 상태에 따라 헤더를 다르게 보여주고 싶다면 
                    <Header /> 컴포넌트 내부에서 useContext를 사용하면 됩니다. */}
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* 홈 */}
                        <Route path="/history" element={<History />} /> {/* 경력 */}
                        <Route path="/program" element={<Program />} /> {/* 프로그램 */}
                        <Route path="/place" element={<Place />} /> {/* 장소 */}
                        <Route path="/reservation" element={<Reservation />} /> {/* 예약 */}
                        <Route path="/video" element={<Video />} /> {/* 영상+좋아요+싫어요 */}
                        <Route path="/contact" element={<Contact />} /> {/* 연락 */}
                        {/* 게시판 */}
                        <Route path="/board" element={<Board />} /> {/* 게시판 */}
                        <Route path="/board/boardwrite" element={<PostWrite />} /> {/* 게시글 작성 */}
                        <Route path="/board/boarddelete/:id" element={<BoardDelete />} /> {/* 게시글 삭제 */}
                        <Route path="/board/edit/:id" element={<EditPostForm />} /> {/* 게시글 수정 */}
                        <Route path="/board/post/:id" element={<PostDetail />} /> {/* 게시글 상세보기 목록*/}
                        {/* user */}
                        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 */}
                        <Route path="signin" element={<SignIn />} /> {/* 로그인 */}
                        <Route path="usercontext" element={<UserContext />} /> {/* 로그인서비스 */}
                        <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
                        <Route path="mypage/update" element={<Update />} /> {/* 회원수정 */}
                        <Route path="mypage/delete" element={<Delete />} /> {/* 회원탈퇴 */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    </UserProvider>
);
}
export default App;