import api from "./api";

/* 도서 등록: POST /books */
export const createBook = async (payload) => {
  try {
    const res = await api.post("/books", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "도서 등록 실패" };
  }
};

/* 도서 수정: PUT /books/{id} */
export const updateBook = async (bookId, payload) => {
  try {
    const res = await api.put(`/books/${bookId}`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "도서 수정 실패" };
  }
};

/* 도서 삭제: DELETE /books/{id} */
export const deleteBook = async (id) => {
  try {
    const res = await api.delete(`/books/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "도서 삭제 실패" };
  }
};

/* 도서 상세조회: GET /books/{id} */
export const getBookDetail = async (id) => {
  try {
    const res = await api.get(`/books/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "도서 상세 조회 실패" };
  }
};

/* 좋아요 추가: POST /books/{id}/likes */
export const likeBook = async (bookId) => {
  try {
    const res = await api.post(`/books/${bookId}/likes`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "좋아요 실패" };
  }
};

/* 좋아요 취소: DELETE /books/{id}/likes */
export const unlikeBook = async (bookId) => {
  try {
    const res = await api.delete(`/books/${bookId}/likes`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "좋아요 취소 실패" };
  }
};

// 전체 도서 목록 조회
export const getBookList = async (category, sort = "latest") => {
  try {
    const res = await api.get("/books", {
      params: {
        category: category === "종합" ? null : category, // 종합이면 카테고리 제외
        sort,
      },
    });

    return res.data.data; // 백엔드의 data 배열
  } catch (err) {
    throw err.response?.data || { message: "도서 목록 조회 실패" };
  }
};

// 인기 도서 조회
export const getPopularBooks = async () => {
  try {
    const res = await api.get("/books/popular");
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { message: "인기 도서 조회 실패" };
  }
};
