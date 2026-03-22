/**
 * 헤더 컴포넌트
 *
 * 사이트 상단에 고정되는 스티키 헤더입니다.
 * - 데스크탑: 로고 + 네비게이션 링크 + 테마 토글
 * - 모바일: 로고 + 모바일 네비 햄버거 버튼 + 테마 토글
 *
 * SafeArea 상단 패딩을 적용하여 노치 영역과 겹치지 않도록 합니다.
 * backdrop-blur와 border-bottom으로 스크롤 시에도 가독성을 유지합니다.
 */

import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header
      // sticky: 스크롤해도 상단에 고정 / backdrop-blur: 반투명 블러 효과
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
      // SafeArea 상단 패딩: iOS 노치/다이나믹 아일랜드 영역과 겹치지 않도록 합니다.
      style={{ paddingTop: "var(--safe-area-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* 로고 / 사이트명 */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80"
        >
          <span className="text-base">{SITE_CONFIG.name}</span>
        </Link>

        {/* 데스크탑 네비게이션 — md(768px) 이상에서만 표시 */}
        <nav
          aria-label="주 네비게이션"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-1">
          {/* 테마 토글 버튼 (항상 표시) */}
          <ThemeToggle />
          {/* 모바일 햄버거 버튼 — md 미만에서만 표시 */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
