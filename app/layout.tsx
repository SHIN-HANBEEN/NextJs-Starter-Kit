/**
 * 루트 레이아웃
 *
 * 모든 페이지에 공통으로 적용되는 최상위 레이아웃입니다.
 * - ThemeProvider: 다크/라이트/시스템 테마 관리
 * - TooltipProvider: shadcn/ui Tooltip 사용을 위한 전역 프로바이더
 * - Toaster (Sonner): 토스트 알림 시스템
 * - Header + Footer: 공통 레이아웃 셸
 * - viewport 설정: 모바일 최적화, SafeArea 지원
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_CONFIG } from "@/lib/constants";

import "./globals.css";

// Geist 폰트 설정 (Next.js 기본 폰트)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 뷰포트 설정 — Next.js 16에서는 metadata와 별도로 export합니다.
export const viewport: Viewport = {
  // 모바일 기기 폭에 맞게 설정
  width: "device-width",
  initialScale: 1,
  // 최대 스케일을 1로 고정하여 핀치 줌을 방지합니다 (앱과 같은 느낌)
  maximumScale: 1,
  userScalable: false,
  // SafeArea 인셋을 사용하기 위해 cover 모드로 설정합니다
  viewportFit: "cover",
  // 다크/라이트 모드에 따른 브라우저 UI 색상 설정
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#252525" },
  ],
};

// 페이지 메타데이터 기본값
export const metadata: Metadata = {
  title: {
    // 각 페이지 제목 뒤에 사이트명을 자동으로 붙입니다
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes가 <html>에 class를 주입할 때
    // 발생하는 hydration 경고를 억제합니다. (의도된 동작)
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* 테마 프로바이더: 다크/라이트/시스템 테마를 전역으로 관리합니다 */}
        <ThemeProvider>
          {/* Tooltip 사용을 위한 전역 프로바이더 */}
          <TooltipProvider>
            {/* 공통 헤더 */}
            <Header />

            {/* 메인 콘텐츠 영역: flex-1로 남은 높이를 모두 차지하여 Footer를 하단에 고정 */}
            <main className="flex flex-1 flex-col">{children}</main>

            {/* 공통 푸터 */}
            <Footer />

            {/* 토스트 알림 시스템 (Sonner) */}
            <Toaster richColors position="top-center" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
