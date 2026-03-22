/**
 * 애니메이션 예제 페이지
 *
 * motion 라이브러리(구 Framer Motion)를 활용한 다양한 애니메이션 예제를 보여줍니다.
 * - FadeIn: 스크롤 기반 페이드인
 * - SlideIn: 방향별 슬라이드인
 * - Stagger: 순차 등장
 * - 제스처: 호버, 탭, 드래그
 * - AnimatePresence: enter/exit 애니메이션
 */

import type { Metadata } from "next";

import {
  FadeInDemo,
  GestureDemo,
  PresenceDemo,
  SlideInDemo,
  StaggerDemo,
} from "@/components/examples/animation-demos";
import { SectionHeader } from "@/components/examples/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "애니메이션",
  description: "Motion(구 Framer Motion)을 활용한 다양한 애니메이션 예제",
};

export default function AnimationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* 페이지 제목 */}
      <FadeIn>
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            애니메이션 예제
          </h1>
          <p className="text-muted-foreground">
            motion 라이브러리로 구현한 스크롤 애니메이션, 제스처, 레이아웃
            전환 예제입니다.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        {/* 1. FadeIn */}
        <section>
          <SectionHeader
            title="FadeIn — 스크롤 페이드인"
            description="뷰포트에 진입할 때 서서히 나타나는 효과 (whileInView + opacity/y)"
          />
          <FadeInDemo />
        </section>

        <Separator />

        {/* 2. SlideIn */}
        <section>
          <SectionHeader
            title="SlideIn — 방향별 슬라이드"
            description="left / right / top / bottom 4가지 방향에서 슬라이드하며 등장"
          />
          <SlideInDemo />
        </section>

        <Separator />

        {/* 3. Stagger */}
        <section>
          <SectionHeader
            title="StaggerChildren — 순차 등장"
            description="자식 요소들이 일정 간격으로 순서대로 등장하는 효과 (staggerChildren)"
          />
          <StaggerDemo />
        </section>

        <Separator />

        {/* 4. 제스처 */}
        <section>
          <SectionHeader
            title="제스처 인터랙션"
            description="whileHover, whileTap, drag를 활용한 인터랙티브 애니메이션"
          />
          <GestureDemo />
        </section>

        <Separator />

        {/* 5. AnimatePresence */}
        <section>
          <SectionHeader
            title="AnimatePresence — Enter / Exit"
            description="항목 마운트/언마운트 시 부드러운 enter/exit 애니메이션"
          />
          <PresenceDemo />
        </section>
      </div>
    </div>
  );
}
