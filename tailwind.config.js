/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────────────
      colors: {
        // 캔버스 & 서피스 사다리 (4단계)
        canvas: '#010102',
        surface: {
          1: '#0d0e12',
          2: '#16181f',
          3: '#1e2028',
          4: '#262831',
        },
        // 헤어라인 테두리
        hairline: {
          DEFAULT: '#23252a',
          strong: '#2e3038',
          tertiary: '#1a1c21',
        },
        // 브랜드 액센트 — 라벤더-블루
        primary: {
          DEFAULT: '#5e6ad2',
          hover: '#828fff',
          focus: '#5e69d1',
          secure: '#7a7fad',
        },
        // 텍스트 계층
        ink: {
          DEFAULT: '#f7f8f8',
          muted: '#d0d6e0',
          subtle: '#8a8f98',
          tertiary: '#62666d',
        },
        // 인버스 (흰 배경 CTA)
        inverse: {
          DEFAULT: '#ffffff',
          surface: '#f5f5f5',
        },
        // 시맨틱
        success: '#27a644',
        overlay: '#000000',
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        display: [
          'Pretendard',
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'sans-serif',
        ],
        sans: [
          'Pretendard',
          'Inter',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Geist Mono',
          'ui-monospace',
          'SF Mono',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        // display-xl: 80px / lh 1.05
        'display-xl': ['80px', { lineHeight: '1.05', letterSpacing: '-3px', fontWeight: '600' }],
        // display-lg: 56px / lh 1.10
        'display-lg': ['56px', { lineHeight: '1.10', letterSpacing: '-1.8px', fontWeight: '600' }],
        // display-md: 40px / lh 1.15
        'display-md': ['40px', { lineHeight: '1.15', letterSpacing: '-1px', fontWeight: '600' }],
        // headline: 28px / lh 1.20
        headline: ['28px', { lineHeight: '1.20', letterSpacing: '-0.6px', fontWeight: '600' }],
        // card-title: 22px / lh 1.25
        'card-title': ['22px', { lineHeight: '1.25', letterSpacing: '-0.4px', fontWeight: '500' }],
        // subhead: 20px / lh 1.40
        subhead: ['20px', { lineHeight: '1.40', letterSpacing: '-0.2px', fontWeight: '400' }],
        // body-lg: 18px / lh 1.50
        'body-lg': ['18px', { lineHeight: '1.50', letterSpacing: '-0.1px', fontWeight: '400' }],
        // body: 16px / lh 1.50
        body: ['16px', { lineHeight: '1.50', letterSpacing: '-0.05px', fontWeight: '400' }],
        // body-sm: 14px / lh 1.50
        'body-sm': ['14px', { lineHeight: '1.50', letterSpacing: '0', fontWeight: '400' }],
        // caption: 12px / lh 1.40
        caption: ['12px', { lineHeight: '1.40', letterSpacing: '0', fontWeight: '400' }],
        // button: 14px / lh 1.20 / w 500
        button: ['14px', { lineHeight: '1.20', letterSpacing: '0', fontWeight: '500' }],
        // eyebrow: 13px / 양의 tracking
        eyebrow: ['13px', { lineHeight: '1.30', letterSpacing: '0.4px', fontWeight: '500' }],
        // mono: 13px
        mono: ['13px', { lineHeight: '1.50', letterSpacing: '0', fontWeight: '400' }],
      },

      // ── Border Radius ───────────────────────────────────────
      borderRadius: {
        xs: '4px',      // 작은 칩, 상태 배지
        sm: '6px',      // 인라인 태그
        md: '8px',      // 버튼, 폼 인풋 (기본)
        lg: '12px',     // 피처·프라이싱·테스티모니얼 카드
        xl: '16px',     // 제품 스크린샷 패널
        '2xl': '24px',  // 대형 CTA 배너 (드물게)
        pill: '9999px', // 탭 토글, 상태 필
        full: '9999px', // 아바타 원형
      },

      // ── Spacing ─────────────────────────────────────────────
      spacing: {
        // 디자인 시스템 토큰 (4px 기준)
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },

      // ── Box Shadow (drop-shadow 사용 금지 — 참조용만 정의) ──
      boxShadow: {
        none: 'none',
        // 포커스 링 (2px primary-focus 50% opacity)
        focus: '0 0 0 2px rgba(94, 105, 209, 0.5)',
      },
    },
  },
  plugins: [],
}

