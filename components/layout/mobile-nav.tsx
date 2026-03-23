"use client";

/**
 * 모바일 네비게이션 컴포넌트
 *
 * 모바일 화면에서 햄버거 버튼을 누르면 왼쪽에서 슬라이드하는
 * Sheet 기반 네비게이션 패널입니다.
 *
 * - 링크 클릭 시 Sheet가 자동으로 닫힙니다.
 * - 터치 친화적인 최소 44px 높이를 보장합니다.
 * - MOBILE_NAV_SECTIONS 상수를 사용하여 섹션별로 링크를 구분합니다.
 */

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MOBILE_NAV_SECTIONS, SITE_CONFIG } from "@/lib/constants";

export function MobileNav() {
  // Sheet 열림/닫힘 상태를 직접 제어합니다 (링크 클릭 시 닫기 위해 필요)
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 햄버거 버튼 — 44px 터치 타겟 보장 */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>

      {/* 왼쪽에서 슬라이드하는 네비게이션 패널 */}
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">{SITE_CONFIG.name}</SheetTitle>
          {/* 스크린리더에게 다이얼로그 목적을 설명합니다 (시각적으로는 숨김) */}
          <SheetDescription className="sr-only">
            사이트 메뉴입니다. 링크를 선택하여 각 페이지로 이동할 수 있습니다.
          </SheetDescription>
        </SheetHeader>

        {/* 네비게이션 링크 목록 */}
        <nav className="mt-6 flex flex-col gap-1">
          {MOBILE_NAV_SECTIONS.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* 섹션 구분선 (첫 번째 섹션 제외) */}
              {sectionIndex > 0 && <Separator className="my-3" />}

              {/* 섹션 제목 */}
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>

              {/* 섹션 내 링크 목록 */}
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  // 링크 클릭 시 Sheet를 닫습니다
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
