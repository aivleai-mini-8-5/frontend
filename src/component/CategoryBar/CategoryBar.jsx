import { Box, Button } from "@mui/material";

export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        pb: "4px",
        my: "10px",
      }}
    >
      {categories.map((cat) => (
        <Button
          key={cat}
          onClick={() => onSelect(cat)}
          sx={{
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            whiteSpace: "nowrap",
            backgroundColor: selected === cat ? "#19bec9" : "#f6f6f6",
            border: "1px solid",
            borderColor: selected === cat ? "#19bec9" : "#ddd",
            color: selected === cat ? "white" : "black",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: selected === cat ? "#18aab4" : "#ececec",
            },
          }}
        >
          {cat}
        </Button>
      ))}
    </Box>
  );
}
