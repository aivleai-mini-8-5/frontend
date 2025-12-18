import { useState, useEffect, useCallback } from "react";
import BookSlider from "../../component/BookSlider/BookSlider";
import CategoryBar from "../../component/CategoryBar/CategoryBar";
import BookList from "../../component/BookList/BookList";
import SortBar from "../../component/SortBar/SortBar";

import { getBookList, getPopularBooks } from "../../services/bookService";

// 카테고리 매핑
const categoryLabels = {
  종합: "종합",
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

export default function MainPage() {
  const [books, setBooks] = useState([]);
  const [popular, setPopular] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("종합");
  const [sortType, setSortType] = useState("latest");

  const loadBooks = useCallback(async () => {
    try {
      const categoryParam =
        selectedCategory === "종합" ? null : selectedCategory;

      const data = await getBookList(categoryParam, sortType);
      setBooks(data);
    } catch {
      alert("도서 목록 불러오기 실패");
    }
  }, [selectedCategory, sortType]);

  const loadPopular = useCallback(async () => {
    try {
      const data = await getPopularBooks();
      setPopular(data);
    } catch {
      alert("인기 도서 불러오기 실패");
    }
  }, []);

  useEffect(() => {
    loadBooks();
    loadPopular();
  }, [loadBooks, loadPopular]);

  return (
    <div className="main-container">
      {/* 인기 도서 */}
      <h1>도서 TOP 10</h1>
      <BookSlider books={popular} />

      {/* 카테고리별 목록 */}
      <h1>카테고리별 도서</h1>

      <div
        className="filter-area"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* 카테고리 바 */}
        <CategoryBar
          categories={Object.values(categoryLabels)}
          selected={categoryLabels[selectedCategory]}
          onSelect={(label) => {
            const key = Object.keys(categoryLabels).find(
              (k) => categoryLabels[k] === label
            );
            setSelectedCategory(key);
          }}
        />

        {/* 정렬 바 */}
        <SortBar sortType={sortType} onSort={setSortType} />
      </div>

      {/* 도서 리스트 */}
      <BookList books={books} />
    </div>
  );
}
