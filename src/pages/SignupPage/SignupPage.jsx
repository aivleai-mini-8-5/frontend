import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import UserInput from "../../component/UserInput";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

export default function SignupPage() {
  const [error, setError] = useState(""); // 에러 메시지
  const navigate = useNavigate();

  // State 정의
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  // State 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // API 통신
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signup(form); // axios 호출

      // 실패 처리
      if (!result.success) {
        setError(result.message || "회원가입 실패");
        alert(result.message || "회원가입 실패");
        return;
      }

      // 성공 처리: 이름 사용 + 로그인 페이지로 이동
      alert(`${result.data.name}님, 회원가입이 완료되었습니다.`);
      console.log(result)
      navigate("/login");
      
    } catch (err) {
      // 백엔드 에러 메시지
      const msg = err.message || "서버 오류";
      setError(msg);
      alert(msg);
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
      placeholder: "비밀번호를 입력해주세요.",
      type: "password",
    },
    {
      name: "name",
      label: "Name:",
      placeholder: "이름을 입력해주세요.",
    },
    {
      name: "phoneNumber",
      label: "Phone number:",
      placeholder: "010-0000-0000",
    },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 4,
          boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
        }}
      >
        <CardContent sx={{ px: 10, py: 8 }}>
          {/* 상단 제목 */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              회원가입
            </Typography>
            <Typography variant="body2" color="text.secondary">
              가입을 통해 더 다양한 서비스를 만나보세요!
            </Typography>
          </Box>

          {/* 상단 영역 */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "1px dashed #d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <span style={{ fontSize: 32 }}>🙋</span>
            </Box>
          </Box>

          {/* 입력 영역 */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={4}>
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

            {/* 회원가입 버튼 */}
            <Box mt={8} my={5} display="flex" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  px: 10,
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "#19bec9",
                  "&:hover": {
                    bgcolor: "#16aeb8",
                  },
                }}
              >
                회원가입
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
