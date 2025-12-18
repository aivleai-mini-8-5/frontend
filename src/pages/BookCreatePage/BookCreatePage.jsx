import { useNavigate } from "react-router-dom";
import { createBook } from "../../services/bookService";
import BookForm from "../../component/BookForm/BookForm";

export default function BookCreatePage() {
  const navigate = useNavigate();

  // 도서 등록 처리
  const handleCreate = async (formData) => {
    try {
      // 도서 생성 API 요청
      const result = await createBook(formData);

      // 응답 success 여부 확인
      if (!result.success) {
        alert(result.message || "도서 등록 실패");
        return;
      }

      // 등록 완료 후 상세 페이지 이동
      navigate(`/books/${result.data.id}`);
    } catch (err) {
      // 비정상 응답 또는 서버 에러 처리
      alert(err.message || "서버 오류");
    }
  };

  return (
    <div>
      <h1>도서 등록</h1>

      {/* BookForm은 mode와 onSubmit만 전달받아 동작 */}
      <BookForm mode="create" onSubmit={handleCreate} />
    </div>
  );
}
