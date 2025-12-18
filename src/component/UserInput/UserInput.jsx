import { Box, Typography, TextField } from "@mui/material";

// 로그인, 회원가입 페이지에서 사용하는 사용자 정보 입력
export default function UserInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} mb={0.7}>
        {label}
      </Typography>

      <TextField
        fullWidth
        size="medium"
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#f8fafc",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "#dce2e8",
            },
            "& input:-webkit-autofill": {   /* 자동완성 후 배경색 초기화 */
              WebkitBoxShadow: "0 0 0 1000px #f8fafc inset",
              WebkitTextFillColor: "#000",
              transition: "background-color 9999s ease-in-out 0s",
            },
        }}
      />
    </Box>
  );
}
