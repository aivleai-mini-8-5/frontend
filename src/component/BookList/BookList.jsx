import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GridWrapper = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "flex-start",
  alignItems: "flex-start",
}));

const Card = styled(Box)(() => ({
  width: "150px",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const Thumb = styled(Box)(() => ({
  width: "150px",
  height: "210px",
  background: "#d9d9d9",
  borderRadius: "6px",
  overflow: "hidden",
}));

const ThumbImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
}));

const Title = styled(Typography)(() => ({
  marginTop: "8px",
  fontSize: "14px",
  fontWeight: 600,
}));

const Author = styled(Typography)(() => ({
  fontSize: "13px",
  color: "#666",
}));

// ====== 컴포넌트 ======
export default function BookList({ books }) {
  const navigate = useNavigate();

  return (
    <GridWrapper>
      {books.map((book) => {
        const bookId = book.id ?? book.bookId;
        const author = book.author ?? "작성자 정보 없음";

        return (
          <Card key={bookId} onClick={() => navigate(`/books/${bookId}`)}>
            <Thumb>
              {book.coverUrl ? (
                <ThumbImage src={book.coverUrl} alt={book.title} />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "#d9d9d9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  표지 없음
                </Box>
              )}
            </Thumb>

            <Title>{book.title}</Title>
            <Author>{author}</Author>
          </Card>
        );
      })}
    </GridWrapper>
  );
}
