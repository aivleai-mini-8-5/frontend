import Sidebar from "../component/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box
      className="layout-container"
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* 왼쪽 사이드바 */}
      <Sidebar />

      {/* 오른쪽 컨텐츠 영역 */}
      <Box
        className="layout-content"
        sx={{
          ml: "200px",
          p: 2,
          boxSizing: "border-box",
          flex: 1,
          minHeight: "100vh",
          bgcolor: "#fafafa",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
