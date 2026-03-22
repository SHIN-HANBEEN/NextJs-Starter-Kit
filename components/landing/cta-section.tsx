/**
 * 랜딩 페이지 CTA(Call to Action) 섹션 (서버 컴포넌트)
 *
 * 페이지 하단에 위치하는 행동 유도 섹션입니다.
 * 예제 페이지와 GitHub 링크로 사용자를 안내합니다.
 */

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-muted/30 px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mb-8 text-muted-foreground">
            예제 페이지에서 애니메이션, 차트, 반응형 로직, 브라우저 저장소
            등 다양한 기능을 직접 확인해 보세요.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/examples">
                예제 탐색하기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                소스 코드 보기
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
