# CLAUDE.md

Next.js 16 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui 기반 모던 웹 스타터킷입니다.

> **Next.js 16 주의**: 이 프로젝트는 Next.js 16을 사용합니다. 학습 데이터와 API/컨벤션이 다를 수 있으므로, 코드 작성 전 `node_modules/next/dist/docs/`의 가이드를 반드시 참조하세요. Deprecation 경고에 유의하세요.

## 명령어

```bash
npm run dev      # 개발 서버 (Turbopack, localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 코드 컨벤션

### Prettier (`.prettierrc`)
- 쌍따옴표(`""`), 세미콜론 사용, trailing comma `es5`, **줄 폭 100자**
- `prettier-plugin-tailwindcss`로 Tailwind 클래스 자동 정렬

### ESLint (`eslint.config.mjs`)
- `next/core-web-vitals` + `next/typescript` + `eslint-config-prettier` 조합
- Prettier와 충돌하는 스타일 규칙은 자동 비활성화

### Import 경로
- `@/*` → 프로젝트 루트 매핑 (예: `@/components/ui/button`, `@/lib/utils`)

## 아키텍처 개요

모든 페이지는 기본적으로 **React Server Component(RSC)**이며, 브라우저 API나 상태가 필요한 컴포넌트에만 `"use client"`를 선언합니다.

### 디렉토리 구조

| 경로 | 역할 |
|------|------|
| `app/` | App Router 페이지 및 레이아웃 |
| `components/ui/` | shadcn/ui 컴포넌트 (직접 수정 가능한 복사본) |
| `components/motion/` | 재사용 애니메이션 래퍼 — `motion/react` (구 Framer Motion) 사용 |
| `components/layout/` | `Header`, `Footer`, `MobileNav` 공통 셸 |
| `components/theme/` | `ThemeProvider`, `ThemeToggle` |
| `components/landing/` | 홈 페이지 전용 섹션 컴포넌트 |
| `components/examples/` | 예제 페이지 클라이언트 컴포넌트 (차트, 애니메이션, 반응형, 저장소) |
| `hooks/` | 커스텀 훅 (`useMounted` 등) |
| `lib/constants.ts` | 전역 상수 (사이트 설정, 네비게이션 링크, 기능 목록) |
| `lib/utils.ts` | `cn()` 유틸리티 (`clsx` + `tailwind-merge`) |

### 전역 레이아웃 (`app/layout.tsx`)

```
ThemeProvider (next-themes)
  └── TooltipProvider (shadcn/ui)
        ├── Header
        ├── <main>{children}</main>
        ├── Footer
        └── Toaster (Sonner, position="top-center")
```

- 폰트: Geist Sans + Geist Mono (CSS variables)
- 뷰포트: `maximumScale: 1`, `userScalable: false`, `viewportFit: "cover"` (모바일 앱 대응)

## 핵심 패턴

### 테마 시스템
- `globals.css`에서 `@theme inline { ... }`으로 Tailwind v4 디자인 토큰 정의 (색상은 `oklch()` 포맷)
- 다크모드: `@custom-variant dark (&:is(.dark *))` — `<html class="dark">`에 의존
- CSS variables 기반이므로 런타임 깜박임 없음

### SSR / 하이드레이션
브라우저 API 의존 컴포넌트는 하이드레이션 불일치 방지를 위해 `useMounted()` 훅을 사용합니다:

```tsx
import { useMounted } from "@/hooks/use-mounted";

const mounted = useMounted();
const value = mounted ? actualClientValue : defaultValue;
```

필요한 경우: `useMediaQuery`(react-responsive), `localStorage` 의존 UI, 테마 토글.

### 네비게이션 상수 관리
새 페이지 추가 시 `lib/constants.ts`의 `NAV_LINKS`와 `MOBILE_NAV_SECTIONS`를 **반드시 함께** 업데이트하세요.

## shadcn/ui 설정

- **스타일**: `radix-nova` (components.json)
- **아이콘**: `lucide-react`
- 컴포넌트 추가: `npx shadcn@latest add <component-name>`
- RSC 기본 활성화 (`"rsc": true`)
- 경로 별칭: `@/components/ui/`, `@/lib/utils`, `@/hooks/`
