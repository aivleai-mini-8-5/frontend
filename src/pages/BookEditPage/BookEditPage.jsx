import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../../component/BookForm/BookForm";

import { getBookDetail, updateBook } from "../../services/bookService";

// 백엔드 ENUM → 프론트 한글 카테고리 변환 매핑
const CATEGORY_ENUM_TO_LABEL = {
  FICTION: "소설",
  NON_FICTION: "비소설",
  SCIENCE: "과학",
  HISTORY: "역사",
  ART: "예술",
  TECHNOLOGY: "기술",
  EDUCATION: "교육",
  TRAVEL: "여행",
  OTHER: "기타",
};

export default function BookEditPage() {
  const { id } = useParams(); // URL params에서 bookId 조회
  const navigate = useNavigate();

  const [bookData, setBookData] = useState(null); // BookForm에 전달할 데이터

  // 기존 도서 정보 조회
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBookDetail(id);
        const book = res.data;

        // BookForm이 요구하는 형태로 데이터 재가공
        const formatted = {
          title: book.title, // 기존 제목
          content: book.content, // 기존 내용
          coverUrl: book.coverUrl, // 기존 표지
          category: CATEGORY_ENUM_TO_LABEL[book.category], // ENUM → 한글 변환
          style: book.style || "미니멀",
          model: book.model || "dall-e-2",
        };

        setBookData(formatted);
      } catch (err) {
        alert("도서 정보를 불러오지 못했습니다.");
      }
    }

    fetchData();
  }, [id]);

  // 수정 요청 처리
  const handleUpdate = async (formData) => {
    try {
      await updateBook(id, formData);
      alert("도서 정보가 수정되었습니다.");

      // 상세 페이지 새로고침을 위한 query param 추가
      navigate(`/books/${id}?updated=${Date.now()}`);
    } catch (err) {
      alert(err.message || "수정 중 오류가 발생했습니다.");
    }
  };

  if (!bookData) return <div>불러오는 중...</div>;

  return (
    <div>
      <h1>도서 수정</h1>
      <BookForm mode="edit" initialData={bookData} onSubmit={handleUpdate} />
    </div>
  );
}
