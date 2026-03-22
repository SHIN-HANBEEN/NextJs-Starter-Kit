"use client";

/**
 * 테마 프로바이더 컴포넌트
 *
 * next-themes 라이브러리를 사용하여 다크/라이트/시스템 테마를 관리합니다.
 * 이 컴포넌트는 반드시 클라이언트 컴포넌트여야 하므로 "use client" 지시어를 사용합니다.
 *
 * 설정:
 * - attribute="class": <html> 태그에 "dark" 클래스를 추가/제거하는 방식으로 동작합니다.
 *   (globals.css의 @custom-variant dark (&:is(.dark *)) 와 연동)
 * - defaultTheme="system": 초기값은 OS 시스템 설정을 따릅니다.
 * - enableSystem: 시스템 다크모드 감지를 활성화합니다.
 * - disableTransitionOnChange: 테마 전환 시 CSS transition을 비활성화하여
 *   요소가 번쩍이는 현상을 방지합니다.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
