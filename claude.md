# Project: 회사 소개 홈페이지

## 프로젝트 개요

회원관리, 제품소개, 온라인문의, 커뮤니티 게시판을 갖춘 기업용 소개 홈페이지

---

## 문서 참조

> 아래 문서를 먼저 읽고 작업하라. 코드 작성 전 요구사항·스키마·디자인 규칙을 반드시 확인한다.

| 문서 | 경로 | 설명 |
|------|------|------|
| 요구사항 명세서 | [`docs/spec/spec-fixed.md`](docs/spec/spec-fixed.md) | REQ-001~015 기능 요구사항 전체 |
| 데이터베이스 스키마 | [`docs/database/schema.md`](docs/database/schema.md) | 테이블 정의, RLS, ERD, DDL 전문 |
| 디자인 시스템 | [`docs/design/design-system.md`](docs/design/design-system.md) | 컬러·타이포·컴포넌트·레이아웃 규칙 |

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| UI 프레임워크 | React 18 + Vite |
| 스타일링 | Tailwind CSS v3 |
| 백엔드 / DB | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| 라우팅 | React Router v6 |
| 상태관리 | Zustand (전역) + TanStack Query (서버 상태) |
| 폼 | React Hook Form + Zod |
| 아이콘 | Lucide React |

---

## 디렉토리 구조

```
src/
├── assets/                  # 정적 이미지, 폰트
├── components/
│   ├── common/              # Button, Input, Modal, Badge 등 공통 컴포넌트
│   ├── layout/              # Header, Footer, Sidebar, Layout
│   └── ui/                  # shadcn/ui 기반 프리미티브
├── features/
│   ├── auth/                # 로그인, 회원가입, 프로필
│   ├── products/            # 제품 목록, 상세, 카드
│   ├── inquiry/             # 온라인 문의 폼, 문의 내역
│   └── community/           # 게시판 목록, 글쓰기
├── hooks/                   # 커스텀 훅 (useAuth, useInquiry 등)
├── lib/
│   ├── supabase.ts          # Supabase 클라이언트 초기화
│   └── utils.ts             # cn(), formatDate() 등 유틸
├── pages/                   # 라우트 단위 페이지 컴포넌트
├── stores/                  # Zustand 스토어
└── types/                   # TypeScript 타입 정의
```

---

## Supabase 데이터베이스 스키마

> 전체 DDL, ERD, RLS 정책은 [`docs/database/schema.md`](docs/database/schema.md) 참조.

### 테이블 요약

| 테이블 | 설명 | 주요 관계 |
|--------|------|-----------|
| `profiles` | 회원 정보 (auth.users 확장) | auth.users 1:1, CASCADE 삭제 |
| `products` | 제품 소개 | 관리자만 쓰기, 전체 공개 읽기 |
| `inquiries` | 온라인 문의 | profiles 1:N (user_id nullable — 비회원 허용) |
| `posts` | 커뮤니티 게시판 | profiles 1:N, CASCADE 삭제 |

### RLS 핵심 규칙

- **profiles**: 본인만 조회·수정 / 관리자 전체 조회
- **products**: 전체 공개 읽기 / 관리자만 쓰기
- **inquiries**: 본인 문의만 조회 / 누구나 INSERT / 관리자 전체 관리
- **posts**: 전체 읽기 / 로그인 사용자 작성 / 본인·관리자 수정·삭제

---

## 페이지 라우팅

```
/                       → 메인 (홈)
/products               → 제품 목록
/products/:slug         → 제품 상세
/inquiry                → 온라인 문의 폼
/inquiry/complete       → 문의 완료
/community              → 커뮤니티 게시판 (기본: 자유게시판)
/community/:board       → 게시판 타입별 (notice | general | qna)
/community/:board/:id   → 게시글 상세
/community/write        → 글쓰기 (로그인 필요)
/auth/login             → 로그인
/auth/register          → 회원가입
/auth/forgot-password   → 비밀번호 재설정
/mypage                 → 마이페이지 (로그인 필요)
/mypage/inquiries       → 내 문의 내역
/admin                  → 관리자 대시보드 (admin 전용)
/admin/members          → 회원 관리
/admin/inquiries        → 문의 관리
/admin/products         → 제품 관리
```

---

## 인증 / 권한

- Supabase Auth (이메일 + 소셜 로그인 옵션)
- 로그인 후 `profiles.role` 기준으로 일반 사용자 / 관리자 분기
- 보호 라우트는 `<PrivateRoute>`, `<AdminRoute>` 컴포넌트로 래핑
- 세션은 Supabase `onAuthStateChange`로 자동 갱신, Zustand `useAuthStore`에 저장

```ts
// stores/useAuthStore.ts 예시
interface AuthStore {
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  setSession: (user: User | null, profile: Profile | null) => void
}
```

---

## 핵심 컴포넌트 규칙

### 공통 Button

```tsx
// props: variant('primary'|'secondary'|'ghost'), size('sm'|'md'|'lg'), loading
<Button variant="primary" size="md" loading={isPending}>
  문의 보내기
</Button>
```

### 게시판 목록 테이블

- 모바일: 카드형 리스트
- 데스크탑: 테이블형 (번호, 제목, 작성자, 날짜, 조회수)
- `is_pinned = true` 공지글은 상단 고정 + 배경 강조

### 온라인 문의 폼

- React Hook Form + Zod 스키마 유효성 검사
- 비회원도 이름/이메일/연락처 수동 입력 가능
- 로그인 사용자는 프로필에서 자동 채움
- 제출 후 Supabase Edge Function으로 이메일 알림 발송 (선택)

---

## 환경 변수 (.env)

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## MCP (Model Context Protocol)

### Supabase MCP

Claude Code에서 Supabase를 MCP로 연결하면 자연어로 DB를 직접 조작할 수 있다.

**연결 설정** (`~/.claude/claude_desktop_config.json` 또는 Claude Code MCP 설정):

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--supabase-url", "https://xxxx.supabase.co", "--supabase-key", "your-service-role-key"]
    }
  }
}
```

> `service_role` 키는 RLS를 우회하므로 개발 환경 전용으로만 사용한다.

**사용 가능한 주요 도구:**

| 도구 | 설명 |
|------|------|
| `list_projects` | 프로젝트 목록 조회 |
| `get_project` | 프로젝트 상세 정보 |
| `list_tables` | 테이블 목록 조회 |
| `execute_sql` | SQL 직접 실행 |
| `apply_migration` | 마이그레이션 적용 |
| `list_migrations` | 마이그레이션 이력 조회 |
| `get_logs` | 서비스 로그 조회 |
| `list_edge_functions` | Edge Function 목록 |
| `deploy_edge_function` | Edge Function 배포 |
| `generate_typescript_types` | DB 스키마 기반 TypeScript 타입 자동 생성 |

**활용 예시:**

```
# 테이블 생성
"profiles 테이블 만들어줘 (claude.md 스키마 기준)"

# 타입 생성
"현재 DB 스키마로 TypeScript 타입 파일 생성해줘"

# 데이터 조회
"inquiries 테이블에서 status가 pending인 문의 목록 보여줘"

# 마이그레이션
"posts 테이블에 thumbnail_url 컬럼 추가하는 마이그레이션 적용해줘"
```

---

## 코딩 컨벤션

- 파일명: `PascalCase` (컴포넌트), `camelCase` (훅, 유틸)
- 컴포넌트당 파일 1개; 200줄 초과 시 분리
- Supabase 쿼리는 `features/*/api.ts`에 모아서 관리
- 에러 처리: 모든 Supabase 호출에 `try/catch` + toast 알림
- Tailwind 클래스: 줄 길어지면 `cn()` 헬퍼로 분리
- TypeScript strict 모드 활성화, `any` 사용 금지
- 컴포넌트 props는 반드시 interface로 타입 선언

---

## 개발 우선순위

1. Supabase 클라이언트 설정 + Auth 연동 (login/register)
2. 레이아웃 (Header, Footer, 반응형 네비게이션)
3. 메인 홈페이지 (히어로, 회사소개, 제품 하이라이트, CTA)
4. 제품 소개 페이지 (목록 + 상세)
5. 온라인 문의 폼
6. 커뮤니티 게시판 (CRUD)
7. 마이페이지 (프로필 수정, 내 문의 내역)
8. 관리자 대시보드
