import { Box, Typography } from "@mui/material";

// 마이페이지에서 사용하는 사용자 정보 표시
export default function UserInfo({ label, value }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography
                variant="body2"
                fontWeight={500}
                color="text.secondary"
                sx={{ mb: 0.5 }}
            >
                {label}
            </Typography>
            <Box
                sx={{
                    bgcolor: "#f9fafb",
                    borderRadius: 1.5,
                    px: 2,
                    py: 1.3,
                    border: "1px solid #e5e7eb",
                    minHeight: 40,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography 
                    variant="body2" 
                    color="text.primary"
                    fontWeight={700}
                >
                    {value || "-"}
                </Typography>
            </Box>
        </Box>
    );
}