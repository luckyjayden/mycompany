# LuckyJayden 디자인 시스템

> 참조: Linear Marketing Canvas Design System  
> 적용 프로젝트: LuckyJayden 회사 홈페이지  
> 기술 스택: React 18 + Tailwind CSS v3  
> 작성일: 2026-06-16

---

## 개요

Linear 마케팅 캔버스의 **다크 서피스 시스템**을 LuckyJayden 회사 홈페이지에 적용한다.  
`#010102` 에 가까운 딥 다크 캔버스 위에 4단계 서피스 레이어로 위계를 구성하고, 단일 크로매틱 액센트(라벤더-블루)로 브랜드 아이덴티티를 표현한다. 제품 스크린샷·고해상도 UI 이미지가 각 섹션의 주인공 역할을 한다.

---

## 1. Colors

### 1-1. 팔레트 정의

| 역할 | 토큰 | HEX | Tailwind 커스텀 키 | 용도 |
|------|------|-----|-------------------|------|
| **캔버스** | `canvas` | `#010102` | `bg-canvas` | 페이지 기본 배경 (딥 블랙) |
| **서피스 1** | `surface-1` | `#0d0e12` | `bg-surface-1` | 카드, 패널 기본 배경 |
| **서피스 2** | `surface-2` | `#16181f` | `bg-surface-2` | Featured 카드, 호버 상태 |
| **서피스 3** | `surface-3` | `#1e2028` | `bg-surface-3` | 서브 네비, 드롭다운 |
| **서피스 4** | `surface-4` | `#262831` | `bg-surface-4` | 가장 깊은 리프트 서피스 |
| **헤어라인** | `hairline` | `#23252a` | `border-hairline` | 카드 1px 테두리 |
| **헤어라인-강** | `hairline-strong` | `#2e3038` | `border-hairline-strong` | 인풋 포커스 테두리 |
| **헤어라인-약** | `hairline-tertiary` | `#1a1c21` | `border-hairline-tertiary` | 중첩 서피스 테두리 |
| **인버스 캔버스** | `inverse-canvas` | `#ffffff` | `bg-inverse` | 인버스 CTA 배경 |

### 1-2. 브랜드 액센트

| 역할 | 토큰 | HEX | Tailwind 커스텀 키 | 용도 |
|------|------|-----|-------------------|------|
| **Primary** | `primary` | `#5e6ad2` | `bg-primary` / `text-primary` | 브랜드 마크, 기본 CTA, 링크 강조 |
| **Primary Hover** | `primary-hover` | `#828fff` | `hover:bg-primary-hover` | CTA 호버 상태 |
| **Primary Focus** | `primary-focus` | `#5e69d1` | `ring-primary-focus` | 포커스 링 색상 |
| **Brand Secure** | `brand-secure` | `#7a7fad` | `text-brand-secure` | 보안·신뢰 섹션 강조 |

> **규칙:** `primary` 라벤더는 브랜드 마크, Primary CTA, 포커스 링, 링크 강조에만 사용한다.  
> 섹션 배경, 카드 채움 등에 사용하지 않는다.

### 1-3. 텍스트

| 역할 | 토큰 | HEX | Tailwind 커스텀 키 | 용도 |
|------|------|-----|-------------------|------|
| **잉크** | `ink` | `#f7f8f8` | `text-ink` | 헤드라인, 강조 본문 |
| **잉크 뮤트** | `ink-muted` | `#d0d6e0` | `text-ink-muted` | 서브 타이틀, 메타 정보 |
| **잉크 서틀** | `ink-subtle` | `#8a8f98` | `text-ink-subtle` | 비활성 탭, 푸터 |
| **잉크 3차** | `ink-tertiary` | `#62666d` | `text-ink-tertiary` | 비활성, 각주 |

### 1-4. 시맨틱

| 역할 | 토큰 | HEX | 용도 |
|------|------|-----|------|
| **Success** | `semantic-success` | `#27a644` | 상태 필, 완료 표시 |
| **Overlay** | `semantic-overlay` | `#000000` | 모달 스크림 |

### 1-5. Tailwind 설정 (`tailwind.config.js`)

```js
theme: {
  extend: {
    colors: {
      canvas: '#010102',
      surface: {
        1: '#0d0e12',
        2: '#16181f',
        3: '#1e2028',
        4: '#262831',
      },
      hairline: {
        DEFAULT: '#23252a',
        strong: '#2e3038',
        tertiary: '#1a1c21',
      },
      primary: {
        DEFAULT: '#5e6ad2',
        hover: '#828fff',
        focus: '#5e69d1',
      },
      ink: {
        DEFAULT: '#f7f8f8',
        muted: '#d0d6e0',
        subtle: '#8a8f98',
        tertiary: '#62666d',
      },
      inverse: '#ffffff',
      success: '#27a644',
    },
  },
},
```

---

## 2. Typography

### 2-1. 폰트 패밀리

| 역할 | 권장 폰트 | Fallback | Tailwind 키 |
|------|-----------|----------|-------------|
| **Display** | Pretendard / Inter | `SF Pro Display, -apple-system, system-ui` | `font-display` |
| **Body** | Pretendard / Inter | `system-ui, -apple-system, Segoe UI` | `font-sans` |
| **Mono** | JetBrains Mono / Geist Mono | `ui-monospace, SF Mono, Menlo` | `font-mono` |

> Linear의 커스텀 타입페이스 대체제로 **Pretendard**를 한국어 환경 1순위로 사용한다.  
> 영문 Display에는 **Inter** weight 500/600/700을 대체재로 사용한다.

### 2-2. 타이포그래피 스케일

| 토큰 | 크기 | Weight | Line Height | Letter Spacing | 용도 |
|------|------|--------|-------------|----------------|------|
| `display-xl` | 80px | 600 | 1.05 | -3.0px | 최대 히어로 헤드라인 |
| `display-lg` | 56px | 600 | 1.10 | -1.8px | 섹션 오프너 헤드라인 |
| `display-md` | 40px | 600 | 1.15 | -1.0px | 서브섹션 헤드라인 |
| `headline` | 28px | 600 | 1.20 | -0.6px | 프라이싱 타이틀, CTA 헤드 |
| `card-title` | 22px | 500 | 1.25 | -0.4px | 피처 카드 제목 |
| `subhead` | 20px | 400 | 1.40 | -0.2px | 리드 바디, 인트로 문단 |
| `body-lg` | 18px | 400 | 1.50 | -0.1px | 히어로 서브헤드, 리드 문단 |
| `body` | 16px | 400 | 1.50 | -0.05px | 기본 본문 |
| `body-sm` | 14px | 400 | 1.50 | 0 | 카드 본문, 푸터 |
| `caption` | 12px | 400 | 1.40 | 0 | 캡션, 메타, 상태 |
| `button` | 14px | 500 | 1.20 | 0 | 모든 버튼 라벨 |
| `eyebrow` | 13px | 500 | 1.30 | +0.4px | 섹션 아이브로 (양의 트래킹) |
| `mono` | 13px | 400 | 1.50 | 0 | 코드 스니펫 |

### 2-3. 원칙

- Display에서 Body로 갈수록 weight를 600 → 400으로 낮춘다. 700 이상 사용 금지.
- Display는 음의 letter-spacing을 적극 적용한다 (80px → -3.0px).
- Eyebrow는 양의 letter-spacing(+0.4px)으로 Display와 대비를 준다.
- Mono는 코드 컨텍스트에만 사용한다.

---

## 3. Layout

### 3-1. 스페이싱 시스템

| 토큰 | 값 | Tailwind | 용도 |
|------|----|----------|------|
| `spacing.xxs` | 4px | `p-1` | 최소 간격 |
| `spacing.xs` | 8px | `p-2` | 인라인 요소 패딩 |
| `spacing.sm` | 12px | `p-3` | 버튼 패딩 (수직) |
| `spacing.md` | 16px | `p-4` | 기본 컴포넌트 패딩 |
| `spacing.lg` | 24px | `p-6` | 카드 내부 패딩 기본 |
| `spacing.xl` | 32px | `p-8` | 테스티모니얼 카드 패딩 |
| `spacing.xxl` | 48px | `p-12` | CTA 배너 패딩 |
| `spacing.section` | 96px | `py-24` | 섹션 간 여백 |

**버튼 패딩:** 수직 8px · 수평 14px (`py-2 px-3.5`)  
**폼 인풋 패딩:** 수직 8px · 수평 12px (`py-2 px-3`)

### 3-2. 그리드 & 컨테이너

- 최대 콘텐츠 너비: **1280px** (`max-w-7xl`)
- 피처 카드: 3열(데스크탑) → 2열(태블릿) → 1열(모바일)
- 프라이싱: 3열 (티어별 카드)
- 제품 스크린샷 패널: 전체 콘텐츠 너비 스팬 (주인공)

### 3-3. 여백 철학

다크 캔버스 자체가 여백이다. 섹션은 서피스-1 패널로의 리프트로 구분하지, 흰 여백 Gap으로 구분하지 않는다. 패널 내부는 `spacing.lg` 24px 블록 간격, 섹션 사이는 `spacing.section` 96px.

---

## 4. Elevation & Depth

| 레벨 | 처리 | 용도 |
|------|------|------|
| 0 (플랫) | 그림자 없음, 테두리 없음 | 히어로 텍스트, 푸터 |
| 1 (charcoal lift) | `surface-1` 배경 + 1px `hairline` | 기본 카드, 제품 패널 |
| 2 (surface-2 lift) | `surface-2` 배경 + 1px `hairline-strong` | Featured 카드, 호버 카드 |
| 3 (surface-3 lift) | `surface-3` 배경 | 서브 네비, 드롭다운 |
| 4 (포커스 링) | 2px `primary-focus` 아웃라인 50% 불투명도 | 포커스 인풋, 포커스 버튼 |

> **그림자(drop-shadow) 사용 금지.** 다크 서피스에서 계층은 서피스 사다리 + 헤어라인 테두리로만 표현한다.

---

## 5. Shapes (Border Radius)

| 토큰 | 값 | Tailwind | 용도 |
|------|----|----------|------|
| `rounded.xs` | 4px | `rounded` | 작은 칩, 상태 배지 |
| `rounded.sm` | 6px | `rounded-md` (커스텀) | 인라인 태그 |
| `rounded.md` | 8px | `rounded-lg` | **모든 버튼**, 폼 인풋 |
| `rounded.lg` | 12px | `rounded-xl` | 프라이싱 카드, 피처 카드 |
| `rounded.xl` | 16px | `rounded-2xl` | 제품 스크린샷 패널 |
| `rounded.xxl` | 24px | `rounded-3xl` | 대형 CTA 배너 (드물게) |
| `rounded.pill` | 9999px | `rounded-full` | 탭 토글, 상태 필 |
| `rounded.full` | 9999px | `rounded-full` | 아바타 원형 |

> **버튼은 반드시 `rounded.md` (8px)** — pill 버튼 금지.

---

## 6. Components

### Button

```tsx
// primary — 라벤더 CTA
<button className="bg-primary hover:bg-primary-hover text-white font-medium text-sm
  py-2 px-3.5 rounded-lg transition-colors focus:outline-none
  focus:ring-2 focus:ring-primary-focus/50">
  시작하기
</button>

// secondary — 차콜 버튼
<button className="bg-surface-1 hover:bg-surface-2 text-ink font-medium text-sm
  py-2 px-3.5 rounded-lg border border-hairline transition-colors">
  로그인
</button>

// tertiary — 텍스트 버튼
<button className="bg-canvas text-ink font-medium text-sm
  py-2 px-3.5 rounded-lg hover:bg-surface-1 transition-colors">
  더 보기
</button>

// inverse — 흰 배경 버튼 (다크 섹션 내)
<button className="bg-white text-gray-900 font-medium text-sm
  py-2 px-3.5 rounded-lg hover:bg-gray-100 transition-colors">
  자세히 보기
</button>
```

### Cards

```tsx
// feature-card
<div className="bg-surface-1 border border-hairline rounded-xl p-6">
  ...
</div>

// pricing-card (기본)
<div className="bg-surface-1 border border-hairline rounded-xl p-6">
  ...
</div>

// pricing-card-featured (추천)
<div className="bg-surface-2 border border-hairline-strong rounded-xl p-6">
  ...
</div>

// product-screenshot-card
<div className="bg-surface-1 border border-hairline rounded-2xl p-6">
  <img ... className="rounded-xl w-full" />
</div>

// testimonial-card
<div className="bg-surface-1 border border-hairline rounded-xl p-8">
  ...
</div>

// cta-banner
<div className="bg-surface-1 border border-hairline rounded-xl p-12">
  ...
</div>
```

### Input

```tsx
// text-input
<input className="w-full bg-surface-1 border border-hairline text-ink text-sm
  rounded-lg py-2 px-3 placeholder:text-ink-subtle
  focus:outline-none focus:ring-2 focus:ring-primary-focus/50
  focus:border-hairline-strong transition-colors" />
```

### Badge / Status Pill

```tsx
// status-badge
<span className="bg-surface-2 text-ink-muted text-xs rounded-full px-2 py-0.5">
  처리중
</span>

// success-badge
<span className="bg-success/10 text-success text-xs rounded-full px-2 py-0.5">
  완료
</span>
```

### Navigation

```tsx
// top-nav
<header className="sticky top-0 z-40 bg-canvas border-b border-hairline h-14
  flex items-center">
  ...
</header>
```

### Eyebrow

```tsx
// 섹션 아이브로 (양의 tracking)
<p className="text-primary text-[13px] font-medium tracking-[0.4px] uppercase mb-3">
  제품 소개
</p>
```

---

## 7. Responsive Breakpoints

| 이름 | 너비 | 주요 변경 |
|------|------|-----------|
| Desktop-XL | 1440px | 기본 데스크탑 레이아웃 |
| Desktop | 1280px | 카드 3열 유지 |
| Tablet | 1024px | 카드 3열 → 2열 |
| Mobile-Lg | 768px | 네비 햄버거, 프라이싱 아코디언 |
| Mobile | 480px | 단열, display-xl 80px → ~36px 축소 |

**터치 타겟:** 버튼 최소 40px, 폼 인풋 44px 높이 유지.

**반응형 축소 전략**

| 요소 | 데스크탑 | 태블릿 | 모바일 |
|------|----------|--------|--------|
| 카드 그리드 | 3열 | 2열 | 1열 |
| `display-xl` | 80px | 56px | 36px |
| 섹션 패딩 | 96px | 64px | 48px |
| 네비 | 인라인 링크 | 인라인 링크 | 햄버거 |

---

## 8. Do's and Don'ts

### Do ✅

- `canvas` (#010102)를 페이지 기본 배경으로 고정한다.
- `primary` 라벤더는 브랜드 마크, CTA, 포커스 링, 링크 강조에만 사용한다.
- 4단계 서피스 사다리(canvas → 1 → 2 → 3 → 4)로 위계를 표현한다.
- Display weight는 600, Body weight는 400으로 페어링한다.
- Display에 음의 letter-spacing을 적극 사용한다.
- 제품 스크린샷/UI 이미지를 각 섹션의 주인공으로 배치한다.
- 버튼은 `rounded.md` (8px) 코너로 통일한다.

### Don't ❌

- 라이트 모드 마케팅 페이지를 만들지 않는다.
- 라벤더를 섹션 배경이나 카드 채움에 사용하지 않는다.
- 두 번째 크로매틱 액센트(오렌지, 핑크, 그린)를 마케팅에 추가하지 않는다.
- 대기 그라디언트나 스포트라이트 카드를 추가하지 않는다.
- 버튼을 pill(완전 원형)로 만들지 않는다.
- `#000000` 순수 블랙을 캔버스로 사용하지 않는다. (#010102 사용)
- Display에 700 이상 weight를 사용하지 않는다.
- Drop-shadow를 다크 서피스 카드에 사용하지 않는다.

---

## 9. 출처 및 참조

- **원본 디자인:** Linear 마케팅 캔버스 (linear.app)
- **참조 페이지:** `/`, `/pricing`, `/contact/sales`, `/build`
- **커스텀 폰트 대체:** Pretendard (한국어) · Inter (영문) · JetBrains Mono (코드)
- **알려진 한계:**
  - 4단계 서피스 사다리 수치는 Linear CSS 변수에서 추출된 값임
  - 폼 에러·유효성 검사 스타일은 미문서화
  - 라이트 모드는 미지원 (마케팅 페이지 다크 전용)
