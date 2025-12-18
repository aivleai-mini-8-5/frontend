import { Box } from "@mui/material";

export default function SidebarItem({ name, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "140px",
        textAlign: "center",
        p: "12px",
        mb: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 500,
        color: "#fff",
        transition: "0.2s",
        bgcolor: active ? "#159ba6" : "transparent",
        "&:hover": {
          bgcolor: "#159ba6",
        },
      }}
    >
      {name}
    </Box>
  );
}
