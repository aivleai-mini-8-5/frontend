import { useEffect, useState } from "react";
import UserInfo from "../../component/UserInfo/UserInfo";
import BookList from "../../component/BookList/BookList";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

export default function MyPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("로그인 정보 없음");
      return;
    }

    // 1) 유저 정보 조회
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("유저 조회 실패:", data.message);
          return;
        }

        setUser({
          name: data.data.name,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
        });
      } catch (err) {
        console.error("유저 조회 오류:", err);
      }
    };

    // 2) 유저 도서 목록 조회
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/books`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("도서 조회 실패:", data.message);
          return;
        }

        setBooks(data.data);
      } catch (err) {
        console.error("도서 조회 오류:", err);
      }
    };

    fetchUser();
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="xl" disableGutters sx={{ px: 0 }}>
      <h1>마이페이지</h1>

      <Grid
        container
        spacing={6}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          bgcolor: "#f5f5f5",
          pt: 10,
          pb: 6,
        }}
      >
        {/* 프로필 */}
        <Grid size={{ xs: 8, md: 5 }}>
          <Box
            sx={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              border: "1px dashed #d1d5db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              bgcolor: "#f9fafb",
            }}
          >
            <span style={{ fontSize: 64 }}>👤</span>
          </Box>
        </Grid>

        {/* 사용자 정보 */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              p: 3,
              boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <UserInfo label="Name" value={user.name} />
            <UserInfo label="Email" value={user.email} />
            <UserInfo label="Phone Number" value={user.phoneNumber} />
          </Card>
        </Grid>
      </Grid>

      {/* ===== 도서 목록 ===== */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2, ml: 1 }}>
          내가 등록한 도서
        </Typography>

        <BookList
          books={books.map((book) => ({
            ...book,
            author: `❤️ ${book.likeCount}`,
          }))}
        />
      </Box>
    </Container>
  );
}
