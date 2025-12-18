# 도서 관리 시스템 프론트엔드

React와 Vite를 사용한 도서 관리 웹 애플리케이션입니다.

## 주요 기능

- **도서 목록 조회** - 카테고리별 필터링 및 최신순/인기순 정렬
- **인기 도서** - TOP 10 인기 도서 슬라이더 (좋아요 기반)
- **도서 등록/수정/삭제** - 새 도서 등록 및 본인 도서만 수정/삭제 가능
- **AI 표지 생성** - OpenAI DALL·E를 사용한 도서 표지 자동 생성
- **좋아요 기능** - 도서에 좋아요 추가/취소
- **사용자 인증** - JWT 기반 로그인/회원가입

## 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **React Router 7** - 클라이언트 사이드 라우팅
- **Material-UI (MUI)** - UI 컴포넌트 라이브러리
- **Axios** - HTTP 클라이언트
- **react-slick** - 슬라이더 컴포넌트

## 설치 및 실행

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn
- 백엔드 서버 (포트 8080)

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 설정

백엔드 서버 주소를 `src/services/api.js`에서 설정합니다.

```javascript
baseURL: "http://localhost:8080"  // 기본값
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 4. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

```bash
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
├── component/          # 재사용 가능한 컴포넌트
│   ├── BookForm/      # 도서 입력 폼 (표지 생성 포함)
│   ├── BookList/      # 도서 목록 그리드
│   ├── BookSlider/    # 인기 도서 슬라이더
│   ├── CategoryBar/   # 카테고리 선택 바
│   ├── SortBar/       # 정렬 옵션 바
│   ├── Sidebar/       # 좌측 네비게이션
│   ├── UserInfo/      # 사용자 정보
│   └── UserInput/     # 사용자 입력 폼
│
├── pages/             # 페이지 컴포넌트
│   ├── MainPage/      # 메인 페이지 (도서 목록 + 인기 도서)
│   ├── LoginPage/     # 로그인 페이지
│   ├── SignupPage/    # 회원가입 페이지
│   ├── BookCreatePage/ # 도서 등록 페이지
│   ├── BookDetailPage/ # 도서 상세 페이지
│   ├── BookEditPage/  # 도서 수정 페이지
│   └── MyPage/        # 마이페이지
│
├── services/          # API 서비스 레이어
│   ├── api.js        # Axios 인스턴스 (JWT 인터셉터)
│   ├── authService.js # 인증 API (로그인, 회원가입)
│   └── bookService.js # 도서 API (CRUD, 좋아요)
│
├── layout/            # 레이아웃 컴포넌트
│   └── Layout.jsx    # 메인 레이아웃 (사이드바 + 컨텐츠)
│
├── assets/            # 정적 리소스
│   └── logo.svg       # 로고
│
├── App.jsx            # 루트 컴포넌트 (라우팅)
└── main.jsx           # 애플리케이션 진입점
```

## 주요 페이지 및 라우팅

| 경로 | 설명 | 인증 필요 |
|------|------|----------|
| `/` | 메인 페이지 (도서 목록 + 인기 도서) | ❌ |
| `/login` | 로그인 | ❌ |
| `/signup` | 회원가입 | ❌ |
| `/books/new` | 도서 등록 | ✅ |
| `/books/:id` | 도서 상세 조회 | ❌ |
| `/books/edit/:id` | 도서 수정 | ✅ (본인만) |
| `/mypage` | 마이페이지 | ✅ |

## API 엔드포인트

### 인증
- `POST /users/signup` - 회원가입
- `POST /users/login` - 로그인

### 도서
- `GET /books` - 도서 목록 (쿼리: `category`, `sort`)
- `GET /books/popular` - 인기 도서 TOP 10
- `GET /books/:id` - 도서 상세
- `POST /books` - 도서 등록
- `PUT /books/:id` - 도서 수정
- `DELETE /books/:id` - 도서 삭제
- `POST /books/:id/likes` - 좋아요 추가
- `DELETE /books/:id/likes` - 좋아요 취소

### 외부 API
- `POST /openai/v1/images/generations` - OpenAI DALL·E 이미지 생성 (프록시)

## 주요 기능 상세

### 도서 등록 및 표지 생성

도서 등록 시 다음 정보를 입력할 수 있습니다:
- 제목, 내용, 카테고리
- 생성 모델 (DALL·E 3 또는 DALL·E 2)
- 스타일 (미니멀, 일러스트, 모던, 수채화, 레트로, 파스텔톤)
- OpenAI API Key (표지 생성 시 필요)

표지 생성 버튼 클릭 시 제목과 스타일을 기반으로 프롬프트가 자동 생성되어 1024x1024 이미지가 생성됩니다.

### 카테고리 및 정렬

**카테고리:** 종합, 소설, 비소설, 과학, 역사, 예술, 기술, 교육, 여행, 기타

**정렬:** 최신순 (`latest`), 인기순 (`popular`)

### 인증 시스템

- JWT 토큰 기반 인증
- 로그인 시 토큰이 `localStorage`에 저장
- 모든 API 요청에 `Authorization: Bearer <token>` 헤더 자동 추가
- `src/services/api.js`의 인터셉터가 자동 처리

## 주의사항

⚠️ **백엔드 서버 필요**
- 백엔드 서버가 `http://localhost:8080`에서 실행 중이어야 합니다.
- CORS 설정이 되어 있어야 합니다.

⚠️ **인증 토큰**
- 로그인 후 JWT 토큰이 `localStorage`에 저장됩니다.
- 모든 API 요청에 자동으로 토큰이 포함됩니다.

⚠️ **OpenAI API Key**
- 표지 생성 기능을 사용하려면 OpenAI API Key가 필요합니다.
- API Key는 브라우저에 저장되지 않으며, 매번 입력해야 합니다.
- 프로덕션 환경에서는 백엔드에서 API Key를 관리하는 것을 권장합니다.
