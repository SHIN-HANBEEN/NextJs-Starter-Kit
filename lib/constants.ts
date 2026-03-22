/**
 * 사이트 전역 상수 정의
 *
 * 사이트명, 설명, 네비게이션 링크 등 프로젝트 전반에서 사용하는
 * 공통 상수를 한 곳에서 관리합니다.
 */

// 사이트 기본 정보
export const SITE_CONFIG = {
  name: "Next.js Starter Kit",
  description:
    "Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui 로 구성된 모던 웹 스타터킷입니다.",
  url: "https://github.com",
  version: "1.0.0",
} as const;

// 데스크탑 헤더 네비게이션 링크
export const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/examples", label: "예제" },
  { href: "/examples/animations", label: "애니메이션" },
  { href: "/examples/charts", label: "차트" },
  { href: "/examples/responsive", label: "반응형" },
  { href: "/examples/storage", label: "저장소" },
] as const;

// 모바일 네비게이션 링크 (섹션 구분 포함)
export const MOBILE_NAV_SECTIONS = [
  {
    title: "홈",
    links: [{ href: "/", label: "홈" }],
  },
  {
    title: "예제",
    links: [
      { href: "/examples", label: "전체 예제" },
      { href: "/examples/animations", label: "애니메이션" },
      { href: "/examples/charts", label: "차트" },
      { href: "/examples/responsive", label: "반응형 로직" },
      { href: "/examples/storage", label: "브라우저 저장소" },
    ],
  },
] as const;

// 푸터 링크
export const FOOTER_LINKS = [
  { href: "https://nextjs.org/docs", label: "Next.js", external: true },
  {
    href: "https://tailwindcss.com",
    label: "Tailwind CSS",
    external: true,
  },
  { href: "https://ui.shadcn.com", label: "shadcn/ui", external: true },
  { href: "https://motion.dev", label: "Motion", external: true },
] as const;

// 기술 스택 배지 목록 (랜딩 페이지용)
export const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "lucide-react",
  "Motion",
  "Recharts",
  "Chart.js",
  "next-themes",
  "react-responsive",
  "usehooks-ts",
  "Vercel",
] as const;

// 랜딩 페이지 기능 카드 목록
export const FEATURES = [
  {
    icon: "Zap",
    title: "Next.js 16 App Router",
    description:
      "최신 Next.js App Router 기반. React Server Components, Turbopack, 스트리밍 SSR을 기본 지원합니다.",
  },
  {
    icon: "Palette",
    title: "Tailwind CSS v4",
    description:
      "CSS-first 설정 방식의 최신 Tailwind v4. @theme 지시어로 디자인 토큰을 직접 CSS에서 관리합니다.",
  },
  {
    icon: "Layers",
    title: "shadcn/ui 컴포넌트",
    description:
      "20개 이상의 고품질 UI 컴포넌트가 사전 설치되어 있습니다. 복사-붙여넣기 방식으로 완전한 커스터마이징이 가능합니다.",
  },
  {
    icon: "Moon",
    title: "다크 모드",
    description:
      "next-themes 기반의 완벽한 다크/라이트/시스템 테마 지원. CSS variables로 깜박임 없는 부드러운 전환을 구현합니다.",
  },
  {
    icon: "Sparkles",
    title: "Motion 애니메이션",
    description:
      "Framer Motion(motion 패키지)으로 스크롤 애니메이션, 레이아웃 전환, 제스처 인터랙션을 손쉽게 구현합니다.",
  },
  {
    icon: "BarChart3",
    title: "이중 차트 시스템",
    description:
      "Recharts(shadcn/ui 통합)와 Chart.js(전문 Canvas 렌더링)를 모두 지원. 용도에 따라 선택하여 사용하세요.",
  },
  {
    icon: "Smartphone",
    title: "모바일 퍼스트",
    description:
      "SafeArea, touch-target(44px+), 줌 방지 등 Capacitor 모바일 앱을 고려한 모바일 우선 설계를 적용합니다.",
  },
  {
    icon: "Database",
    title: "브라우저 저장소",
    description:
      "usehooks-ts의 useLocalStorage로 SSR 안전한 사용자 설정 저장을 구현합니다. react-responsive로 JS 반응형 로직도 지원합니다.",
  },
] as const;
