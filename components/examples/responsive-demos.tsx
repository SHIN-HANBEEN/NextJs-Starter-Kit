"use client";

/**
 * 반응형 로직 데모 컴포넌트
 *
 * react-responsive의 useMediaQuery 훅을 사용하여
 * JS 레벨에서 화면 크기에 따른 로직을 분기하는 예제입니다.
 *
 * CSS 반응형(Tailwind sm:, md:, lg:)과의 차이점:
 * - CSS 반응형: 스타일 변경에 사용 (display, flex-direction 등)
 * - JS 반응형: 비즈니스 로직 분기에 사용 (다른 컴포넌트 렌더링, 다른 API 호출 등)
 *
 * 포함된 데모:
 * 1. 현재 브레이크포인트 실시간 감지
 * 2. 디바이스별 다른 컴포넌트 렌더링
 * 3. CSS 반응형 vs JS 반응형 비교
 *
 * SSR 하이드레이션 처리:
 * - useMediaQuery는 서버에서 window 크기를 알 수 없으므로 모두 false를 반환합니다.
 * - useMounted 훅으로 클라이언트 마운트 후에만 실제 값을 사용해 하이드레이션 불일치를 방지합니다.
 */

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import { useMounted } from "@/hooks/use-mounted";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── 브레이크포인트 정의 (Tailwind CSS 기준) ──────────────────────
// Tailwind v4 기본 브레이크포인트와 동일하게 맞춥니다.
const BREAKPOINTS = {
  xs: "(max-width: 639px)",       // sm 미만 — 모바일
  sm: "(min-width: 640px)",       // sm 이상
  md: "(min-width: 768px)",       // md 이상 — 태블릿
  lg: "(min-width: 1024px)",      // lg 이상 — 데스크탑
  xl: "(min-width: 1280px)",      // xl 이상
} as const;

// ─── 1. 현재 브레이크포인트 실시간 표시 ──────────────────────────
export function BreakpointDisplay() {
  // 클라이언트 마운트 여부를 확인합니다 (하이드레이션 불일치 방지).
  const mounted = useMounted();

  // 각 브레이크포인트를 개별적으로 감지합니다.
  // 마운트 전(SSR/하이드레이션)에는 사용하지 않으므로 항상 훅을 호출합니다(Rules of Hooks).
  const isXs = useMediaQuery({ query: BREAKPOINTS.xs });
  const isSm = useMediaQuery({ query: BREAKPOINTS.sm });
  const isMd = useMediaQuery({ query: BREAKPOINTS.md });
  const isLg = useMediaQuery({ query: BREAKPOINTS.lg });
  const isXl = useMediaQuery({ query: BREAKPOINTS.xl });

  // 현재 적용 중인 최대 브레이크포인트를 계산합니다.
  // 마운트 전에는 서버 렌더링과 동일한 기본값("xs (기본)")을 사용합니다.
  const currentBreakpoint = !mounted
    ? "xs (기본)"
    : isXl
      ? "xl (1280px+)"
      : isLg
        ? "lg (1024px+)"
        : isMd
          ? "md (768px+)"
          : isSm
            ? "sm (640px+)"
            : "xs (기본)";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        브라우저 창 크기를 조절하면 현재 활성 브레이크포인트가 실시간으로
        업데이트됩니다.
      </p>

      {/* 현재 브레이크포인트 표시 */}
      <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
        <div className="text-sm font-medium text-muted-foreground">
          현재 브레이크포인트:
        </div>
        <Badge className="text-sm">{currentBreakpoint}</Badge>
      </div>

      {/* 브레이크포인트별 활성 상태 — 마운트 전에는 모두 비활성으로 표시해 하이드레이션 불일치를 방지합니다. */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          { label: "xs", active: mounted && isXs, desc: "< 640px" },
          { label: "sm", active: mounted && isSm, desc: "≥ 640px" },
          { label: "md", active: mounted && isMd, desc: "≥ 768px" },
          { label: "lg", active: mounted && isLg, desc: "≥ 1024px" },
          { label: "xl", active: mounted && isXl, desc: "≥ 1280px" },
        ].map((bp) => (
          <div
            key={bp.label}
            className={`rounded-lg border p-3 text-center transition-colors ${
              bp.active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-muted/30 text-muted-foreground"
            }`}
          >
            <p className="font-mono text-sm font-bold">{bp.label}</p>
            <p className="text-xs">{bp.desc}</p>
            <p className="mt-1 text-xs font-medium">
              {bp.active ? "✓ 활성" : "비활성"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. 디바이스별 다른 컴포넌트 렌더링 ──────────────────────────
export function DeviceSpecificComponent() {
  // 클라이언트 마운트 여부를 확인합니다 (하이드레이션 불일치 방지).
  const mounted = useMounted();

  // 모바일: sm 미만 (640px 미만)
  const isMobile = useMediaQuery({ query: BREAKPOINTS.xs });
  // 태블릿: md 이상이지만 lg 미만
  const isTablet = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 1023px)",
  });
  // 데스크탑: lg 이상
  const isDesktop = useMediaQuery({ query: BREAKPOINTS.lg });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        화면 크기에 따라 JS 로직으로 완전히 다른 컴포넌트를 렌더링합니다.
        CSS의 display: none과 달리 실제로 DOM에 해당 컴포넌트가 마운트되지
        않습니다.
      </p>

      {/* 마운트 후에만 디바이스별 컴포넌트를 렌더링합니다 (하이드레이션 불일치 방지). */}
      {/* 모바일: 스택형 카드 */}
      {mounted && isMobile && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CardContent className="flex items-center gap-3 pt-4">
            <Smartphone className="size-8 text-blue-500" />
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300">
                모바일 뷰
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                단일 열 레이아웃, 터치 최적화 UI
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 태블릿: 2열 레이아웃 */}
      {mounted && isTablet && (
        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
          <CardContent className="flex items-center gap-3 pt-4">
            <Tablet className="size-8 text-green-500" />
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300">
                태블릿 뷰
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                2열 그리드 레이아웃, 사이드바 패널
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 데스크탑: 풀 레이아웃 */}
      {mounted && isDesktop && (
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950">
          <CardContent className="flex items-center gap-3 pt-4">
            <Monitor className="size-8 text-purple-500" />
            <div>
              <p className="font-semibold text-purple-700 dark:text-purple-300">
                데스크탑 뷰
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                다중 열 레이아웃, 고정 사이드바, 상세 정보 패널
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── 3. CSS 반응형 vs JS 반응형 비교 ──────────────────────────────
export function ComparisonDemo() {
  // 클라이언트 마운트 여부를 확인합니다 (하이드레이션 불일치 방지).
  const mounted = useMounted();
  const isMobile = useMediaQuery({ query: BREAKPOINTS.xs });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* CSS 반응형 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">CSS 반응형 (Tailwind)</CardTitle>
            <CardDescription className="text-xs">
              스타일 변경에 사용. DOM에는 두 요소 모두 존재하며 CSS로
              보이기/숨기기만 합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-3 font-mono text-xs">
              {`<div className="hidden md:block">`}
              <br />
              {`  {/* 데스크탑 전용 */}`}
              <br />
              {`</div>`}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              DOM: 두 요소 모두 존재 (display: none으로 숨김)
            </p>
          </CardContent>
        </Card>

        {/* JS 반응형 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">JS 반응형 (react-responsive)</CardTitle>
            <CardDescription className="text-xs">
              로직 분기에 사용. 조건에 맞는 컴포넌트만 DOM에 마운트됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-3 font-mono text-xs">
              {`const isMobile = useMediaQuery(...)`}
              <br />
              {`{isMobile`}
              <br />
              {`  ? <MobileNav />`}
              <br />
              {`  : <DesktopNav />}`}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              DOM: 조건에 해당하는 컴포넌트만 마운트
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 현재 실제 감지 상태 — 마운트 후에만 실제 값을 표시합니다. */}
      <div className="rounded-md border p-3 text-sm">
        <span className="font-medium">현재 isMobile: </span>
        <Badge variant={mounted && isMobile ? "default" : "secondary"}>
          {mounted
            ? isMobile ? "true (모바일)" : "false (태블릿/데스크탑)"
            : "감지 중..."}
        </Badge>
      </div>
    </div>
  );
}
