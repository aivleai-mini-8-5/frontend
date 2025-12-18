import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

// 이미지 생성 모델 리스트
const MODEL_LIST = [
  { label: "DALL·E 3", value: "dall-e-3" },
  { label: "DALL·E 2", value: "dall-e-2" },
];

// 프론트 카테고리 한국어 목록
const CATEGORY_LIST = [
  "소설",
  "비소설",
  "과학",
  "역사",
  "예술",
  "기술",
  "교육",
  "여행",
  "기타",
];

// ENUM 매핑
const CATEGORY_ENUM_MAP = {
  소설: "FICTION",
  비소설: "NON_FICTION",
  과학: "SCIENCE",
  역사: "HISTORY",
  예술: "ART",
  기술: "TECHNOLOGY",
  교육: "EDUCATION",
  여행: "TRAVEL",
  기타: "OTHER",
};

// 스타일 목록
const STYLE_LIST = [
  "미니멀",
  "일러스트",
  "모던",
  "수채화",
  "레트로",
  "파스텔톤",
];

export default function BookForm({ initialData, onSubmit, mode = "create" }) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(initialData?.model || "dall-e-2");
  const [style, setStyle] = useState(initialData?.style || "미니멀");
  const [category, setCategory] = useState(
    initialData?.category || CATEGORY_LIST[0]
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.category);
      setModel(initialData.model);
      setStyle(initialData.style);
      setCoverUrl(initialData.coverUrl);
    }
  }, [initialData, mode]);

  // 프롬프트 생성
  const buildPrompt = () => `
  "${title}"이라는 주제에서 연상되는 분위기, 상징적 장면 또는 오브젝트를 중심으로
  하나의 완성된 아트워크 이미지를 생성해주세요.

  [스타일 적용]
  - 선택한 스타일: "${style}"
  - 해당 스타일의 시각적 특징(색감, 명암, 질감, 브러시 느낌, 채도, 형태)을 이미지 전체에 자연스럽게 적용할 것.
  - '${style}' 스타일이 한눈에 느껴지는 표현 방식 사용.

  [구성 규칙]
  - "${title}"에서 유추되는 상징적 요소, 장면, 오브젝트를 1~2개 중심으로 배치.
  - 불필요하게 복잡하거나 과도하게 많은 오브젝트는 피하고, 통일감 있는 구성 유지.
  - 중심 피사체가 뚜렷하게 보이도록 하되, 분위기를 표현하는 배경도 조화롭게 구성.
  - 책 표지 디자인처럼 보이지 않도록 레이아웃적 구획(제목 공간, 테두리, 프레임 등) 사용 금지.
  - 높은 해상도에 적합한 디테일로 표현.

  [금지 사항]
  - 텍스트, 글자, 숫자, 로고, 워터마크를 포함하지 말 것.
  - 책 표지 형태(표지 틀, 제목 배치 영역, 출판 디자인 레이아웃) 금지.
  - 인쇄물처럼 보이는 요소(테두리, 찢어진 종이 질감 등) 배제.
  - 만화풍 말풍선이나 UI 요소 삽입 금지.

  [출력 목표]
  - "${style}" 스타일을 강하게 반영한 고품질 아트워크.
  - "${title}"의 감정·분위기·상징을 시각적으로 잘 전달하는 구성.
`;
  // 이미지 생성 요청
  const generateCover = async () => {
    if (!apiKey) return alert("API Key를 입력하세요.");
    if (!title) return alert("제목을 입력하세요.");

    setLoading(true);
    setCoverUrl("");

    try {
      const response = await fetch("/openai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt: buildPrompt(),
          size: "1024x1024",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);
      setCoverUrl(data.data[0].url);
    } catch (err) {
      alert("이미지 생성 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      category: CATEGORY_ENUM_MAP[category],
      coverUrl,
      style,
      model,
    });
  };

  return (
    <Box sx={{ width: "100%", mt: "50px", px: "40px", pb: 6 }}>
      <Box sx={{ display: "flex", gap: "40px" }}>
        {/* ========== 왼쪽: 이미지 영역 ========== */}
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "380px",
              height: "520px",
              background: "#d9d9d9",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : coverUrl ? (
              <img
                src={coverUrl}
                alt="cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography color="gray">표지가 여기에 생성됩니다</Typography>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={generateCover}
            disabled={loading}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              bgcolor: "#35b7c8",
              borderRadius: "10px",
              fontSize: "16px",
              "&:hover": { bgcolor: "#2aa8b7" },
            }}
          >
            {loading ? "생성중..." : "표지 생성"}
          </Button>
        </Box>

        {/* ========== 오른쪽: 입력 영역 ========== */}
        <Box sx={{ width: "60%" }}>
          {/* API Key */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>API Key</Typography>
            <TextField
              fullWidth
              size="small"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { background: "#fafafa", p: 1.2 },
              }}
            />
          </Box>

          {/* 3개 선택 박스 */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {/* 모델 */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>생성 모델</Typography>
              <TextField
                select
                fullWidth
                value={model}
                size="small"
                onChange={(e) => setModel(e.target.value)}
                sx={{ "& .MuiInputBase-root": { background: "#fafafa" } }}
              >
                {MODEL_LIST.map((m) => (
                  <MenuItem key={m.value} value={m.value}>
                    {m.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* 스타일 */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>스타일</Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                sx={{ "& .MuiInputBase-root": { background: "#fafafa" } }}
              >
                {STYLE_LIST.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* 카테고리 */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>카테고리</Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ "& .MuiInputBase-root": { background: "#fafafa" } }}
              >
                {CATEGORY_LIST.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* 제목 */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>제목</Typography>
            <TextField
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ "& .MuiInputBase-root": { background: "#fafafa" } }}
            />
          </Box>

          {/* 내용 */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>내용</Typography>
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  background: "#fafafa",
                  p: 1.2,
                },
              }}
            />
          </Box>

          {/* 제출 버튼 */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.6,
              fontSize: "17px",
              bgcolor: "#35b7c8",
              borderRadius: "10px",
              "&:hover": { bgcolor: "#2aa8b7" },
            }}
            onClick={handleSubmit}
          >
            {mode === "edit" ? "수정하기" : "등록하기"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
