import { Box, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import Logo from "../../assets/logo.svg";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const guestMenus = [
    { name: "메인 페이지", path: "/" },
    { name: "로그인", path: "/login" },
  ];

  const userMenus = [
    { name: "메인 페이지", path: "/" },
    { name: "도서 등록", path: "/books/new" },
    { name: "마이페이지", path: "/mypage" },
    { name: "로그아웃", type: "logout" },
  ];

  const menus = isLoggedIn ? userMenus : guestMenus;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "200px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "#19bec9",
        p: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* 로고 */}
      <Box sx={{ width: "120px", mb: 3 }}>
        <img src={Logo} alt="logo" style={{ width: "100%" }} />
      </Box>

      {/* 메뉴 목록 */}
      {menus.map((menu, i) => {
        if (menu.type === "logout") {
          return (
            <SidebarItem
              key={i}
              name={menu.name}
              active={false}
              onClick={handleLogout}
            />
          );
        }

        return (
          <Link
            key={i}
            to={menu.path}
            style={{ textDecoration: "none", width: "140px" }}
          >
            <SidebarItem
              name={menu.name}
              active={location.pathname === menu.path}
            />
          </Link>
        );
      })}
    </Box>
  );
}
