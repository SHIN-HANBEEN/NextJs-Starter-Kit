# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 (Turbopack, localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 아키텍처 개요

Next.js 16 App Router 기반 스타터킷입니다. 모든 페이지는 기본적으로 **React Server Component(RSC)**이며, 브라우저 API나 상태가 필요한 컴포넌트에만 `"use client"`를 선언합니다.

### 전역 레이아웃 구조

`app/layout.tsx`가 모든 페이지를 감싸며, 다음 계층으로 구성됩니다:

```
ThemeProvider (next-themes)
  └── TooltipProvider (shadcn/ui)
        ├── Header
        ├── <main>{children}</main>
        ├── Footer
        └── Toaster (Sonner)
```

### 디렉토리 역할

| 경로 | 역할 |
|------|------|
| `app/` | Next.js App Router 페이지 및 레이아웃 |
| `components/ui/` | shadcn/ui 컴포넌트 (직접 수정 가능한 복사본) |
| `components/motion/` | 재사용 애니메이션 래퍼 (`FadeIn`, `SlideIn`, `StaggerChildren`) |
| `components/layout/` | `Header`, `Footer` 공통 셸 |
| `components/theme/` | `ThemeProvider`, `ThemeToggle` |
| `components/landing/` | 홈 페이지 전용 섹션 컴포넌트 |
| `components/examples/` | 각 예제 페이지의 클라이언트 컴포넌트 |
| `hooks/` | 커스텀 훅 (`useMounted` 등) |
| `lib/constants.ts` | 전역 상수 (사이트 설정, 네비게이션 링크, 기능 목록 등) |

### 테마 시스템

- `globals.css`에 `@theme inline { ... }`으로 Tailwind v4 디자인 토큰을 정의합니다.
- 다크모드는 `<html class="dark">`에 의존하며, `@custom-variant dark (&:is(.dark *))` 방식으로 동작합니다.
- 색상 값은 `oklch()` 포맷으로 정의되어 있습니다.

### SSR / 하이드레이션 패턴

브라우저 API에 의존하는 컴포넌트는 하이드레이션 불일치를 방지하기 위해 `useMounted()` 훅을 사용합니다:

```tsx
import { useMounted } from "@/hooks/use-mounted";

const mounted = useMounted();
// 마운트 전에는 서버 렌더링과 동일한 기본값을 사용합니다.
const value = mounted ? actualClientValue : defaultValue;
```

이 패턴이 필요한 경우: `useMediaQuery`(react-responsive), `localStorage` 의존 UI, 테마 토글.

### 차트 시스템

두 라이브러리를 병행 사용합니다:

- **Recharts** (`components/examples/recharts-demos.tsx`): shadcn/ui `ChartContainer`로 래핑, CSS variables로 다크모드 자동 지원. 일반적인 대시보드 차트에 권장.
- **Chart.js** (`components/examples/chartjs-demos.tsx`): Canvas 렌더링, 복잡한 커스터마이징이나 대용량 데이터에 권장. `"use client"` 필수.

### 애니메이션

`motion/react` (구 Framer Motion) 패키지를 사용합니다. `components/motion/`의 래퍼 컴포넌트를 우선 활용하세요:

- `<FadeIn delay={0.2}>`: 스크롤 진입 시 페이드인 (`whileInView`)
- `<SlideIn direction="left">`: 방향별 슬라이드
- `<StaggerChildren>`: 자식 요소 순차 등장

### 네비게이션 상수 관리

네비게이션 링크, 사이트 설정, 기술 스택 목록은 모두 `lib/constants.ts`에서 관리합니다. 새 페이지 추가 시 `NAV_LINKS`와 `MOBILE_NAV_SECTIONS`를 함께 업데이트하세요.
