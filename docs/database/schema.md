# 데이터베이스 스키마

> 프로젝트: LuckyJayden 회사홈페이지  
> DB 엔진: PostgreSQL 17 (Supabase)  
> 작성일: 2026-06-16

---

## 목차

1. [ERD 개요](#erd-개요)
2. [테이블 정의](#테이블-정의)
   - [profiles](#profiles--회원-정보)
   - [products](#products--제품-소개)
   - [inquiries](#inquiries--온라인-문의)
   - [posts](#posts--커뮤니티-게시판)
3. [관계 정의](#관계-정의)
4. [RLS 정책 요약](#rls-정책-요약)
5. [트리거 / 함수](#트리거--함수)
6. [DDL 전문](#ddl-전문)

---

## ERD 개요

```
auth.users (Supabase 내장)
    │
    │ 1:1
    ▼
profiles ──────────────────────────────┐
    │                                  │
    │ 1:N                1:N           │ 1:N
    ▼                    ▼             ▼
inquiries              posts        (관리자 권한)
```

- `auth.users` → `profiles`: 회원 가입 시 트리거로 자동 생성 (1:1)
- `profiles` → `inquiries`: 회원이 문의 다수 접수 가능 (1:N, nullable — 비회원 허용)
- `profiles` → `posts`: 회원이 게시글 다수 작성 가능 (1:N)

---

## 테이블 정의

### `profiles` — 회원 정보

`auth.users`를 확장하는 회원 프로필 테이블. 가입 시 트리거로 자동 생성.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|------|------|------|--------|------|
| `id` | `uuid` | PK, FK → auth.users(id) | — | 사용자 고유 ID |
| `name` | `text` | NOT NULL | — | 이름 |
| `email` | `text` | NOT NULL | — | 이메일 |
| `phone` | `text` | nullable | — | 연락처 |
| `role` | `text` | NOT NULL | `'user'` | 권한 (`user` \| `admin`) |
| `avatar_url` | `text` | nullable | — | 프로필 이미지 URL |
| `created_at` | `timestamptz` | | `now()` | 생성일시 |
| `updated_at` | `timestamptz` | | `now()` | 수정일시 |

**인덱스**
- PK: `id`

**RLS**
- 본인 행만 조회·수정 가능
- 관리자(`role = 'admin'`)는 전체 조회 가능

---

### `products` — 제품 소개

홈페이지에 노출되는 제품 정보. 관리자만 등록·수정·삭제 가능.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|------|------|------|--------|------|
| `id` | `uuid` | PK | `gen_random_uuid()` | 제품 고유 ID |
| `title` | `text` | NOT NULL | — | 제품명 |
| `slug` | `text` | NOT NULL, UNIQUE | — | URL 식별자 (영문 소문자·숫자·하이픈) |
| `summary` | `text` | nullable | — | 한 줄 요약 |
| `description` | `text` | nullable | — | 상세 설명 (HTML 허용) |
| `image_url` | `text` | nullable | — | 대표 이미지 URL |
| `category` | `text` | nullable | — | 제품 카테고리 |
| `is_featured` | `boolean` | | `false` | 추천 제품 여부 |
| `order_index` | `integer` | | `0` | 정렬 순서 (오름차순) |
| `created_at` | `timestamptz` | | `now()` | 생성일시 |
| `updated_at` | `timestamptz` | | `now()` | 수정일시 |

**인덱스**
- PK: `id`
- UNIQUE: `slug`

**RLS**
- 전체 공개 읽기 (비로그인 포함)
- 쓰기(INSERT·UPDATE·DELETE): 관리자만 가능

---

### `inquiries` — 온라인 문의

비회원·회원 모두 접수 가능한 문의 테이블.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|------|------|------|--------|------|
| `id` | `uuid` | PK | `gen_random_uuid()` | 문의 고유 ID |
| `user_id` | `uuid` | FK → profiles(id), nullable | — | 작성 회원 ID (비회원이면 NULL) |
| `name` | `text` | NOT NULL | — | 작성자 이름 |
| `email` | `text` | NOT NULL | — | 작성자 이메일 |
| `phone` | `text` | nullable | — | 작성자 연락처 |
| `category` | `text` | NOT NULL | — | 문의 유형 (`제품문의` \| `견적요청` \| `기타`) |
| `title` | `text` | NOT NULL | — | 문의 제목 |
| `content` | `text` | NOT NULL | — | 문의 내용 |
| `status` | `text` | | `'pending'` | 처리 상태 (`pending` \| `in_progress` \| `resolved`) |
| `answer` | `text` | nullable | — | 관리자 답변 |
| `answered_at` | `timestamptz` | nullable | — | 답변 등록 일시 |
| `created_at` | `timestamptz` | | `now()` | 접수 일시 |

**FK 옵션**
- `user_id` 참조 회원 삭제 시 → `SET NULL`

**인덱스**
- PK: `id`

**RLS**
- SELECT: 본인 문의(`user_id = auth.uid()`)만 조회 가능
- INSERT: 누구나 가능 (비회원 포함)
- 관리자: 전체 SELECT·UPDATE 가능

---

### `posts` — 커뮤니티 게시판

공지사항·자유게시판·Q&A 세 가지 게시판을 하나의 테이블로 관리.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|------|------|------|--------|------|
| `id` | `uuid` | PK | `gen_random_uuid()` | 게시글 고유 ID |
| `user_id` | `uuid` | FK → profiles(id) NOT NULL | — | 작성자 ID |
| `board` | `text` | NOT NULL | `'general'` | 게시판 구분 (`notice` \| `general` \| `qna`) |
| `title` | `text` | NOT NULL | — | 제목 |
| `content` | `text` | NOT NULL | — | 내용 |
| `is_pinned` | `boolean` | | `false` | 공지 고정 여부 |
| `view_count` | `integer` | | `0` | 조회수 |
| `created_at` | `timestamptz` | | `now()` | 작성 일시 |
| `updated_at` | `timestamptz` | | `now()` | 수정 일시 |

**FK 옵션**
- `user_id` 참조 회원 삭제 시 → `CASCADE` (게시글도 함께 삭제)

**인덱스**
- PK: `id`

**정렬 기본값** (목록 조회 시)
1. `is_pinned DESC` (공지 우선)
2. `created_at DESC` (최신순)

**RLS**
- SELECT: 전체 공개 (비로그인 포함)
- INSERT: 로그인 사용자, `user_id = auth.uid()` 조건
- UPDATE·DELETE: 본인 글만 가능
- 관리자: 전체 INSERT·UPDATE·DELETE 가능

---

## 관계 정의

| 관계 | 부모 테이블 | 자식 테이블 | 컬럼 | 삭제 옵션 |
|------|------------|------------|------|-----------|
| auth.users → profiles | auth.users | profiles | `id` | CASCADE |
| profiles → inquiries | profiles | inquiries | `user_id` | SET NULL |
| profiles → posts | profiles | posts | `user_id` | CASCADE |

---

## RLS 정책 요약

| 테이블 | 작업 | 허용 대상 |
|--------|------|-----------|
| profiles | SELECT | 본인, 관리자 |
| profiles | UPDATE | 본인 |
| products | SELECT | 전체 (비로그인 포함) |
| products | INSERT·UPDATE·DELETE | 관리자 |
| inquiries | SELECT | 본인 (`user_id`), 관리자 |
| inquiries | INSERT | 전체 (비로그인 포함) |
| inquiries | UPDATE | 관리자 |
| posts | SELECT | 전체 (비로그인 포함) |
| posts | INSERT | 로그인 사용자 (본인 `user_id`) |
| posts | UPDATE·DELETE | 본인, 관리자 |

> 관리자 조건: `EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')`

---

## 트리거 / 함수

### `handle_new_user()` — 신규 회원 프로필 자동 생성

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

**동작:** `auth.users`에 새 행 삽입 시 자동 실행.  
`raw_user_meta_data`에 `name`이 있으면 사용, 없으면 이메일 앞부분을 이름으로 사용.

---

## DDL 전문

```sql
-- =============================================
-- profiles
-- =============================================
CREATE TABLE profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  role        text NOT NULL DEFAULT 'user',
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "본인 프로필 조회/수정" ON profiles
  USING (auth.uid() = id);

CREATE POLICY "관리자 전체 조회" ON profiles
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- =============================================
-- products
-- =============================================
CREATE TABLE products (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  slug         text NOT NULL UNIQUE,
  summary      text,
  description  text,
  image_url    text,
  category     text,
  is_featured  boolean DEFAULT false,
  order_index  integer DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "전체 공개 읽기" ON products FOR SELECT USING (true);

CREATE POLICY "관리자 쓰기" ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- =============================================
-- inquiries
-- =============================================
CREATE TABLE inquiries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  category    text NOT NULL,
  title       text NOT NULL,
  content     text NOT NULL,
  status      text DEFAULT 'pending',
  answer      text,
  answered_at timestamptz,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "본인 문의 조회" ON inquiries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "문의 등록 (비회원 포함)" ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "관리자 전체 조회/수정" ON inquiries FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- =============================================
-- posts
-- =============================================
CREATE TABLE posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES profiles(id) ON DELETE CASCADE,
  board       text NOT NULL DEFAULT 'general',
  title       text NOT NULL,
  content     text NOT NULL,
  is_pinned   boolean DEFAULT false,
  view_count  integer DEFAULT 0,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "전체 읽기" ON posts FOR SELECT USING (true);

CREATE POLICY "로그인 사용자 작성" ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 글 수정" ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "본인 글 삭제" ON posts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "관리자 전체 관리" ON posts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- =============================================
-- 트리거: 신규 회원 프로필 자동 생성
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```
