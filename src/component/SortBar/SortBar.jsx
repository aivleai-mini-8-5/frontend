import { Box, Button } from "@mui/material";

export default function SortBar({ sortType, onSort }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      {/* 최신순 */}
      <Button
        onClick={() => onSort("latest")}
        sx={{
          padding: "4px 10px",
          minHeight: "28px",
          fontSize: "13px",
          backgroundColor: sortType === "latest" ? "#19bec9" : "#eee",
          color: sortType === "latest" ? "#fff" : "black",
          borderRadius: "14px",
          "&:hover": {
            backgroundColor: sortType === "latest" ? "#18aab4" : "#e0e0e0",
          },
        }}
      >
        최신순
      </Button>

      {/* 추천순 */}
      <Button
        onClick={() => onSort("popular")}
        sx={{
          padding: "4px 10px",
          minHeight: "28px",
          fontSize: "13px",
          backgroundColor: sortType === "popular" ? "#19bec9" : "#eee",
          color: sortType === "popular" ? "#fff" : "black",
          borderRadius: "14px",
          "&:hover": {
            backgroundColor: sortType === "popular" ? "#18aab4" : "#e0e0e0",
          },
        }}
      >
        추천순
      </Button>
    </Box>
  );
}
