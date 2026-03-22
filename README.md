<div align="center">

# ⚡ Next.js Starter Kit

**프로덕션 레디 Next.js 16 스타터킷**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-4.1-18181b?logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e)](LICENSE)

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · Recharts · Chart.js가 사전 구성된
모던 웹 + 모바일 앱(Capacitor) 스타터킷입니다.

[**예제 보기**](#-예제-페이지) · [**빠른 시작**](#-빠른-시작) · [**아키텍처**](#-아키텍처)

</div>

---

## 📦 기술 스택

```mermaid
mindmap
  root((Next.js Starter Kit))
    프론트엔드
      Next.js 16
        App Router
        React Server Components
        Turbopack
      React 19
      TypeScript 5
    스타일링
      Tailwind CSS v4
        CSS-first @theme
        oklch 색상 시스템
      shadcn/ui
        20+ 컴포넌트
      tw-animate-css
    애니메이션
      motion
        FadeIn
        SlideIn
        StaggerChildren
        AnimatePresence
    차트
      Recharts
        shadcn/ui 통합
        다크모드 자동 대응
      Chart.js
        Canvas 렌더링
        대용량 데이터
    상태·데이터
      usehooks-ts
        useLocalStorage
      react-responsive
        useMediaQuery
      next-themes
        다크·라이트·시스템
    모바일
      Capacitor 대응
        SafeArea
        터치 최적화
        줌 방지
```

---

## 🏗 아키텍처

### 앱 레이아웃 구조

```mermaid
graph TD
    A["app/layout.tsx<br/>(Root Layout)"] --> B["ThemeProvider<br/>(next-themes)"]
    B --> C["TooltipProvider<br/>(shadcn/ui)"]
    C --> D["Header"]
    C --> E["&lt;main&gt; {children}"]
    C --> F["Footer"]
    C --> G["Toaster (Sonner)"]

    E --> H["/ 홈"]
    E --> I["/examples 예제 목록"]
    E --> J["/examples/animations"]
    E --> K["/examples/charts"]
    E --> L["/examples/responsive"]
    E --> M["/examples/storage"]

    style A fill:#18181b,color:#fff,stroke:#3f3f46
    style B fill:#7c3aed,color:#fff,stroke:#6d28d9
    style C fill:#0369a1,color:#fff,stroke:#075985
    style D fill:#374151,color:#fff
    style F fill:#374151,color:#fff
    style G fill:#374151,color:#fff
    style H fill:#166534,color:#fff
    style I fill:#166534,color:#fff
    style J fill:#166534,color:#fff
    style K fill:#166534,color:#fff
    style L fill:#166534,color:#fff
    style M fill:#166534,color:#fff
```

### 컴포넌트 계층 구조

```mermaid
graph LR
    ROOT["components/"] --> UI["ui/\nshadcn/ui 컴포넌트 20+\nBadge · Card · Chart\nDialog · Tabs 등"]
    ROOT --> MOTION["motion/\nFadeIn\nSlideIn\nStaggerChildren"]
    ROOT --> LAYOUT["layout/\nHeader\nFooter"]
    ROOT --> THEME["theme/\nThemeProvider\nThemeToggle"]
    ROOT --> LANDING["landing/\nHero\nFeatures\nTechStack"]
    ROOT --> EXAMPLES["examples/\nrecharts-demos\nchartjs-demos\nresponsive-demos\nstorage-demos"]

    style ROOT fill:#18181b,color:#fff
    style UI fill:#0c4a6e,color:#fff
    style MOTION fill:#4c1d95,color:#fff
    style LAYOUT fill:#1e3a5f,color:#fff
    style THEME fill:#3b1f5e,color:#fff
    style LANDING fill:#14532d,color:#fff
    style EXAMPLES fill:#7c2d12,color:#fff
```

### RSC vs 클라이언트 컴포넌트 분리 전략

```mermaid
flowchart TD
    Q{"브라우저 API\n상태 · 이벤트 필요?"}
    Q -- 아니오 --> RSC["✅ React Server Component\napp/page.tsx\napp/examples/*/page.tsx\n기본값 — 서버에서 렌더링"]
    Q -- 예 --> CC["⚡ Client Component\n'use client' 선언 필수"]

    CC --> C1["components/layout/header.tsx\n네비게이션 상태"]
    CC --> C2["components/theme/*\n테마 토글"]
    CC --> C3["components/motion/*\nIntersectionObserver"]
    CC --> C4["components/examples/*\n차트 · 미디어쿼리 · localStorage"]

    RSC --> NOTE1["🚀 번들 크기 절감\n빠른 초기 로딩 · SEO 최적화"]
    CC --> NOTE2["🔄 인터랙티브\n브라우저 API 접근 가능"]

    style RSC fill:#166534,color:#fff
    style CC fill:#9a3412,color:#fff
    style NOTE1 fill:#14532d,color:#fff
    style NOTE2 fill:#7c2d12,color:#fff
```

---

## 🎨 테마 시스템

```mermaid
flowchart LR
    OS["🖥 OS 시스템 설정\nprefers-color-scheme"] --> NT["next-themes\nThemeProvider"]
    USER["👤 사용자 선택\nThemeToggle"] --> NT

    NT -- "attribute='class'" --> HTML["&lt;html class='dark'&gt;"]
    HTML --> CSS["globals.css\n@custom-variant dark\n&:is(.dark *)"]
    CSS --> LIGHT["☀️ Light\n--background: oklch(1 0 0)"]
    CSS --> DARK["🌙 Dark\n--background: oklch(0.15 0 0)"]

    LIGHT --> TW["Tailwind CSS v4\n@theme inline\nCSS variables → 유틸리티 클래스"]
    DARK --> TW

    style NT fill:#7c3aed,color:#fff
    style HTML fill:#18181b,color:#fff
    style LIGHT fill:#fef9c3,color:#1c1917
    style DARK fill:#18181b,color:#fff
    style TW fill:#0369a1,color:#fff
```

---

## 📊 차트 시스템

```mermaid
quadrantChart
    title 차트 라이브러리 선택 가이드
    x-axis 단순한 설정 --> 복잡한 커스터마이징
    y-axis 적은 데이터 --> 대용량 데이터
    quadrant-1 Chart.js 권장
    quadrant-2 Chart.js 권장
    quadrant-3 Recharts 권장
    quadrant-4 Recharts 권장
    Recharts Bar: [0.25, 0.3]
    Recharts Line: [0.3, 0.4]
    Recharts Area: [0.3, 0.45]
    Recharts Pie: [0.2, 0.25]
    ChartJs Bar: [0.65, 0.7]
    ChartJs Line: [0.7, 0.75]
    ChartJs Radar: [0.8, 0.6]
    ChartJs Doughnut: [0.6, 0.65]
```

| 항목 | Recharts | Chart.js |
|------|:--------:|:--------:|
| 렌더링 방식 | SVG | Canvas |
| shadcn/ui 통합 | ✅ | ❌ |
| 다크모드 자동 대응 | ✅ CSS variables | 수동 색상 지정 |
| 권장 용도 | 대시보드·일반 차트 | 복잡한 커스터마이징·대용량 |

---

## 📱 모바일 퍼스트 & 배포 전략

```mermaid
flowchart TD
    SRC["Next.js Web App\n(이 스타터킷)"]

    SRC --> WEB["🌐 Vercel\nWeb 배포"]
    SRC --> CAP["Capacitor\n네이티브 앱 패키징"]

    CAP --> AND["🤖 Android\nnpx cap run android\nGoogle Play Store"]
    CAP --> IOS["🍎 iOS\nGitHub Actions CI/CD\nApple App Store\nWindows 로컬 빌드 불가"]

    subgraph UX["모바일 UX 최적화 (globals.css + layout.tsx)"]
        direction LR
        SA["SafeArea\nviewportFit: cover\nenv(safe-area-inset-*)"]
        TT["Touch Target\n최소 44 × 44px"]
        ZB["줌 방지\nmaximumScale: 1\nuserScalable: false"]
        TS["드래그 방지\nuser-select: none\nWebKit 터치 스크롤 제어"]
    end

    CAP --> UX

    style SRC fill:#18181b,color:#fff
    style WEB fill:#0070f3,color:#fff
    style CAP fill:#0ea5e9,color:#fff
    style AND fill:#3ddc84,color:#1c1917
    style IOS fill:#555555,color:#fff
```

---

## 🔄 SSR 하이드레이션 패턴

브라우저 API에 의존하는 값은 서버/클라이언트 간 렌더링 불일치가 발생합니다. `useMounted()` 훅으로 해결합니다.

```mermaid
sequenceDiagram
    participant S as 서버 (SSR)
    participant C as 클라이언트
    participant H as useMounted()

    S->>C: HTML 전달 (mounted=false, 기본값으로 렌더링)
    Note over C: React 하이드레이션 시작
    C->>H: 컴포넌트 마운트
    H->>H: useEffect 실행<br/>setMounted(true)
    H->>C: mounted = true 반환
    C->>C: 실제 브라우저 값으로 리렌더링
    Note over S,C: 하이드레이션 불일치 없음 ✅
```

**적용 대상:** `useMediaQuery` (react-responsive) · `localStorage` 의존 UI · 테마 토글

---

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/SHIN-HANBEEN/NextJs-Starter-Kit.git
cd NextJs-Starter-Kit

# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 주요 명령어

```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

---

## 📁 프로젝트 구조

```
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (ThemeProvider, Header, Footer)
│   ├── page.tsx                # 홈 페이지
│   ├── globals.css             # 전역 스타일 (Tailwind v4 @theme, 다크모드)
│   └── examples/
│       ├── page.tsx            # 예제 목록
│       ├── animations/         # motion 애니메이션 예제
│       ├── charts/             # Recharts + Chart.js 예제
│       ├── responsive/         # react-responsive 예제
│       └── storage/            # useLocalStorage 예제
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트 (20+)
│   ├── motion/                 # 재사용 애니메이션 래퍼 (FadeIn, SlideIn, StaggerChildren)
│   ├── layout/                 # Header, Footer
│   ├── theme/                  # ThemeProvider, ThemeToggle
│   ├── landing/                # 홈 페이지 섹션 컴포넌트
│   └── examples/               # 예제 페이지 클라이언트 컴포넌트
├── hooks/
│   └── use-mounted.ts          # SSR 하이드레이션 안전 훅
└── lib/
    └── constants.ts            # 전역 상수 (NAV_LINKS, SITE_CONFIG 등)
```

---

## 🖥 예제 페이지

| 예제 | 경로 | 핵심 기술 |
|------|------|-----------|
| 애니메이션 | `/examples/animations` | `motion` — FadeIn, SlideIn, Stagger, 제스처, AnimatePresence |
| 차트 | `/examples/charts` | `recharts` + `chart.js` — Bar, Line, Area, Pie, Radar, Doughnut |
| 반응형 로직 | `/examples/responsive` | `react-responsive` — useMediaQuery, 브레이크포인트 실시간 감지 |
| 브라우저 저장소 | `/examples/storage` | `usehooks-ts` — useLocalStorage, 객체 저장, 폼 자동저장 |

---

## 🛠 MCP 도구 (Claude Code)

이 프로젝트는 Claude Code와 함께 다음 MCP 서버를 활용합니다:

| MCP | 용도 |
|-----|------|
| [`@playwright/mcp`](https://github.com/microsoft/playwright-mcp) | 브라우저 자동화, 런타임 오류 수집 및 UI 테스트 |
| [`mcp-mermaid`](https://github.com/hustcc/mcp-mermaid) | Mermaid 다이어그램 생성 및 PNG/SVG 내보내기 |

---

<div align="center">

Made with ❤️ using **Next.js** · **React** · **TypeScript** · **Tailwind CSS v4** · **shadcn/ui**

</div>
