/**
 * 푸터 컴포넌트
 *
 * 사이트 하단에 위치하는 서버 컴포넌트 푸터입니다.
 * - 저작권 정보, 기술 스택 링크를 표시합니다.
 * - SafeArea 하단 패딩을 적용하여 홈 인디케이터와 겹치지 않도록 합니다.
 */

import Link from "next/link";

import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t bg-background"
      // SafeArea 하단 패딩: iOS 홈 인디케이터 영역과 겹치지 않도록 합니다.
      style={{ paddingBottom: "var(--safe-area-bottom)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* 저작권 */}
          <p className="text-sm text-muted-foreground">
            © {currentYear}{" "}
            <span className="font-medium text-foreground">
              {SITE_CONFIG.name}
            </span>
          </p>

          {/* 기술 스택 링크 */}
          <nav
            aria-label="기술 스택 링크"
            className="flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
