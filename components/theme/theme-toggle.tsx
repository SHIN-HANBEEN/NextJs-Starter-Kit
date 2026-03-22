"use client";

/**
 * 테마 전환 토글 버튼 컴포넌트
 *
 * 라이트 모드 / 다크 모드 / 시스템 설정 동기화를 지원하는
 * 드롭다운 메뉴 형태의 테마 전환 컴포넌트입니다.
 *
 * - next-themes의 useTheme 훅으로 현재 테마 상태를 읽고 변경합니다.
 * - useMounted 훅으로 hydration 불일치를 방지합니다.
 *   (서버에서는 아이콘이 무엇인지 알 수 없으므로 마운트 전에는 스켈레톤 버튼을 보여줍니다.)
 * - 터치 친화적인 44×44px (size-11) 최소 크기를 보장합니다.
 */

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useMounted();

  // 마운트 전에는 동일한 크기의 빈 버튼을 렌더링하여 레이아웃 이동(CLS)을 방지합니다.
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-11" disabled>
        <span className="sr-only">테마 전환</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 터치 친화적인 44px 최소 크기 버튼 */}
        <Button variant="ghost" size="icon" className="size-11">
          {/* 라이트 모드에서는 Sun 아이콘, 다크 모드에서는 Moon 아이콘을 표시합니다. */}
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마 전환</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* 라이트 모드 선택 */}
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent" : ""}
        >
          <Sun className="mr-2 size-4" />
          라이트
        </DropdownMenuItem>
        {/* 다크 모드 선택 */}
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-accent" : ""}
        >
          <Moon className="mr-2 size-4" />
          다크
        </DropdownMenuItem>
        {/* 시스템 설정 동기화 선택 */}
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent" : ""}
        >
          <Monitor className="mr-2 size-4" />
          시스템
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
