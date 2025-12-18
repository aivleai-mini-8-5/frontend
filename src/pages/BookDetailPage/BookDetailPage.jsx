import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Typography, Button, Card, CardMedia } from "@mui/material";

import {
  getBookDetail,
  deleteBook,
  likeBook,
  unlikeBook,
} from "../../services/bookService";

// 백엔드 ENUM → 한글 변환
const CATEGORY_MAP = {
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

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인한 사용자 ID
  const loginUserId = Number(localStorage.getItem("userId"));
  const [book, setBook] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedByMe, setLikedByMe] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // 상세 조회
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await getBookDetail(id);
        const data = res.data;

        setBook(data);
        setLikes(data.likeCount);
        setLikedByMe(data.likedByMe);
        setIsOwner(loginUserId === data.userId);
      } catch {
        alert("도서 정보를 불러오지 못했습니다.");
      }
    }

    fetchDetail();
  }, [id, loginUserId]);

  if (!book) return <Typography>불러오는 중...</Typography>;

  // 좋아요 등록
  const handleLike = async () => {
    try {
      await likeBook(id);
      setLikes((n) => n + 1);
      setLikedByMe(true);
    } catch {
      alert("좋아요 실패");
    }
  };

  // 좋아요 취소
  const handleUnlike = async () => {
    try {
      await unlikeBook(id);
      setLikes((n) => n - 1);
      setLikedByMe(false);
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBook(id);
      alert("삭제되었습니다.");
      navigate("/");
    } catch {
      alert("삭제 실패");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "960px",
        mx: "auto",
        py: 6,
        px: 3,
        fontFamily: "Pretendard",
      }}
    >
      {/* ===== 상단 영역 ===== */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* --- 표지 이미지 --- */}
        <Card
          elevation={3}
          sx={{
            width: 260,
            height: 360,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {book.coverUrl ? (
            <CardMedia
              component="img"
              image={book.coverUrl}
              alt={book.title}
              sx={{ height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f2f2f2",
                color: "#666",
                fontSize: 18,
              }}
            >
              표지 없음
            </Box>
          )}
        </Card>

        {/* --- 텍스트 정보 --- */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 32, fontWeight: 700, mb: 2 }}>
            {book.title}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography sx={{ fontSize: 17, color: "#444" }}>
              작성자 · {book.userName}
            </Typography>
            <Typography sx={{ fontSize: 17, color: "#444" }}>
              카테고리 · {CATEGORY_MAP[book.category] ?? book.category}
            </Typography>
            <Typography sx={{ fontSize: 17, color: "#444" }}>
              생성일 · {book.createdAt}
            </Typography>
            <Typography sx={{ fontSize: 17, color: "#444" }}>
              수정일 · {book.updatedAt}
            </Typography>
          </Box>
        </Box>

        {/* --- 좋아요 --- */}
        <Box sx={{ textAlign: "center", minWidth: 60 }}>
          <Button
            onClick={likedByMe ? handleUnlike : handleLike}
            sx={{
              fontSize: 32,
              minWidth: "auto",
              background: "none",
              "&:hover": { background: "none", transform: "scale(1.2)" },
            }}
          >
            {likedByMe ? "❤️" : "🤍"}
          </Button>

          <Typography sx={{ mt: 1, fontSize: 15 }}>{likes}</Typography>
        </Box>
      </Box>

      {/* ===== 본문 내용 ===== */}
      <Card
        elevation={1}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 2,
          fontSize: 18,
          lineHeight: 1.8,
        }}
      >
        {book.content.split("\n").map((line, i) => (
          <Typography key={i} sx={{ mb: 1.5 }}>
            {line}
          </Typography>
        ))}
      </Card>

      {/* ===== 수정·삭제 버튼 (본인만) ===== */}
      {isOwner && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" } }}
            onClick={() => navigate(`/books/edit/${id}`)}
          >
            수정
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}
            onClick={handleDelete}
          >
            삭제
          </Button>
        </Box>
      )}
    </Box>
  );
}
