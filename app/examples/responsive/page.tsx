/**
 * 반응형 로직 예제 페이지
 *
 * react-responsive의 useMediaQuery를 사용하여
 * JS 레벨에서 화면 크기에 따른 컴포넌트 분기 처리를 보여줍니다.
 */

import type { Metadata } from "next";

import {
  BreakpointDisplay,
  ComparisonDemo,
  DeviceSpecificComponent,
} from "@/components/examples/responsive-demos";
import { SectionHeader } from "@/components/examples/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "반응형 로직",
  description: "react-responsive를 활용한 JS 레벨 반응형 로직 예제",
};

export default function ResponsivePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <FadeIn>
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">반응형 로직</h1>
          <p className="text-muted-foreground">
            react-responsive의 useMediaQuery로 JS 레벨에서 화면 크기에 따른
            컴포넌트 분기 처리를 구현합니다. 브라우저 창 크기를 조절하며
            확인해보세요.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        <section>
          <SectionHeader
            title="현재 브레이크포인트 감지"
            description="브라우저 창 크기에 따른 활성 브레이크포인트를 실시간으로 표시합니다."
          />
          <BreakpointDisplay />
        </section>

        <Separator />

        <section>
          <SectionHeader
            title="디바이스별 컴포넌트 분기"
            description="화면 크기에 따라 완전히 다른 컴포넌트를 마운트합니다."
          />
          <DeviceSpecificComponent />
        </section>

        <Separator />

        <section>
          <SectionHeader
            title="CSS 반응형 vs JS 반응형"
            description="언제 CSS를 쓰고 언제 JS 반응형 로직을 사용해야 하는지 비교합니다."
          />
          <ComparisonDemo />
        </section>
      </div>
    </div>
  );
}
