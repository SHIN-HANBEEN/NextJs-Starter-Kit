/**
 * 랜딩 페이지 히어로 섹션 (서버 컴포넌트)
 *
 * 랜딩 페이지 최상단에 위치하는 메인 히어로 섹션입니다.
 * - 스타터킷 이름과 설명을 큰 타이포그래피로 강조합니다.
 * - "예제 보기" / "GitHub" CTA 버튼 2개를 제공합니다.
 * - 모바일에서는 중앙 정렬, 데스크탑에서는 좌측 정렬 레이아웃을 적용합니다.
 */

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* 배경 그라디언트 장식 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* 버전 배지 */}
      <FadeIn>
        <Badge variant="outline" className="mb-6 px-3 py-1 text-xs">
          v1.0.0 — Next.js 16 기반
        </Badge>
      </FadeIn>

      {/* 메인 타이틀 */}
      <SlideIn direction="bottom" delay={0.1}>
        <h1 className="mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          모던 웹 개발을{" "}
          <span className="text-muted-foreground">빠르게 시작하세요</span>
        </h1>
      </SlideIn>

      {/* 설명 */}
      <SlideIn direction="bottom" delay={0.2}>
        <p className="mb-10 max-w-xl text-base text-muted-foreground sm:text-lg">
          Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion ·
          Recharts · Chart.js 가 사전 구성된 프로덕션 레디 스타터킷
        </p>
      </SlideIn>

      {/* CTA 버튼 그룹 */}
      <SlideIn direction="bottom" delay={0.3}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          {/* 주요 CTA: 예제 보기 */}
          <Button asChild size="lg" className="min-w-36 gap-2">
            <Link href="/examples">
              예제 보기
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          {/* 보조 CTA: GitHub */}
          <Button asChild variant="outline" size="lg" className="min-w-36 gap-2">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </SlideIn>
    </section>
  );
}
