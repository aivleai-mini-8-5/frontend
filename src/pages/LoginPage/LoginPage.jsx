import { useState } from "react";
import { login } from "../../services/authService";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UserInput from "../../component/UserInput";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Link,
  Stack,
} from "@mui/material";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State 정의
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // State 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // API 통신
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(form); // axios 호출

      // 실패 처리
      if (!result.success) {
        setError(result.message || "로그인 실패");
        return;
      }

      // 성공 처리: token 저장
      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("userId", String(result.data.userId));
      localStorage.setItem("token", result.data.token);
      console.log(result);

      navigate("/");
    } catch (err) {
      // authService에서 throw한 에러 처리
      setError(err.message || "서버 오류");
    }
  };

  // 입력 필드
  const fields = [
    {
      name: "email",
      label: "Email:",
      placeholder: "your_email@example.com",
      type: "email",
    },
    {
      name: "password",
      label: "Password:",
      placeholder: "비밀번호 입력",
      type: "password",
    },
  ];

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: 520,
          height: 620,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
        }}
      >
        <Box component={"form"} onSubmit={handleSubmit} noValidate>
          <CardContent sx={{ p: 6 }}>
            <Stack spacing={5}>
              {/* 제목 영역 */}
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  로그인
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  가입하신 이메일 주소로 로그인하세요.
                </Typography>
              </Box>

              {/* 입력 영역 */}
              <Grid container spacing={2}>
                {fields.map((field) => (
                  <Grid key={field.name} size={12}>
                    <UserInput
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: 200,
                  alignSelf: "center",
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  bgcolor: "#19bec9",
                }}
              >
                로그인
              </Button>

              {/* 회원가입 링크 */}
              <Box textAlign="center">
                <Typography variant="body2">
                  첫 방문이신가요?{" "}
                  <Link
                    component={RouterLink}
                    to="/signup" // SingupPage로 이동
                  >
                    회원 가입
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
