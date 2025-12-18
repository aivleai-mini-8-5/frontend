import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Box, Typography, Button, Card } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ArrowButton({ direction, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",

        [direction === "next" ? "right" : "left"]: "-55px",

        bgcolor: "rgba(255,255,255,0.95)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        zIndex: 200,
        cursor: "pointer",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "26px",
        fontWeight: 700,
        color: "#333",

        "&:hover": {
          bgcolor: "#19bec9",
          color: "#fff",
        },
      }}
    >
      {direction === "next" ? "›" : "‹"}
    </Box>
  );
}

function NextArrow(props) {
  return <ArrowButton direction="next" onClick={props.onClick} />;
}

function PrevArrow(props) {
  return <ArrowButton direction="prev" onClick={props.onClick} />;
}

export default function BookSlider({ books }) {
  const navigate = useNavigate();
  if (!Array.isArray(books)) return null;

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        overflow: "visible",
        position: "relative",
        px: 6,
        py: 2,
      }}
    >
      <Slider {...settings}>
        {books.map((book) => (
          <Box key={book.bookId} sx={{ px: 1.5 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  height: 220,
                  background: "#d9d9d9",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 1.2,
                }}
              >
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#555",
                    }}
                  >
                    표지 없음
                  </Box>
                )}
              </Box>

              <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                {book.title}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#666" }}>
                {book.author}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: 13, color: "#0070c0" }}>
                좋아요 {book.likeCount}
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  mt: 1.5,
                  fontSize: 13,
                  borderColor: "#19bec9",
                  color: "#19bec9",
                  borderRadius: "6px",
                }}
                onClick={() => navigate(`/books/${book.bookId}`)}
              >
                자세히 보기
              </Button>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
