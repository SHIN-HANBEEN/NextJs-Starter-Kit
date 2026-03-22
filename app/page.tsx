/**
 * 홈(랜딩) 페이지
 *
 * 4개의 섹션 컴포넌트를 순서대로 조합하여 랜딩 페이지를 구성합니다.
 * 모든 섹션은 서버 컴포넌트이므로 클라이언트 JS 번들에 포함되지 않습니다.
 * (애니메이션 래퍼 컴포넌트만 클라이언트 컴포넌트입니다.)
 */

import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";

export default function HomePage() {
  return (
    <>
      {/* 1. 히어로: 메인 타이틀 + CTA 버튼 */}
      <HeroSection />

      {/* 2. 기능 소개: 8개 기능 카드 그리드 */}
      <FeaturesSection />

      {/* 3. 기술 스택: Badge 목록 */}
      <TechStackSection />

      {/* 4. CTA: 예제 탐색 + GitHub 링크 */}
      <CtaSection />
    </>
  );
}
