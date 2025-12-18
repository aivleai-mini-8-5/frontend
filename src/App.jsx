import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import MainPage from "./pages/MainPage/MainPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";

import BookCreatePage from "./pages/BookCreatePage/BookCreatePage.jsx";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage.jsx";
import BookEditPage from "./pages/BookEditPage/BookEditPage.jsx";

import MyPage from "./pages/MyPage/MyPage.jsx";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route path="books/new" element={<BookCreatePage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="books/edit/:id" element={<BookEditPage />} />

        <Route path="mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
