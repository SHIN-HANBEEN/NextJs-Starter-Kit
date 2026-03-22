"use client";

/**
 * 페이드인 애니메이션 래퍼 컴포넌트
 *
 * 자식 요소가 뷰포트에 진입할 때 서서히 나타나는 효과를 적용합니다.
 * motion 라이브러리(구 Framer Motion)의 whileInView를 사용하여
 * 스크롤 기반 페이드인 애니메이션을 구현합니다.
 *
 * @param delay - 애니메이션 시작 지연 시간 (초 단위, 기본값: 0)
 * @param duration - 애니메이션 지속 시간 (초 단위, 기본값: 0.5)
 * @param className - 추가 CSS 클래스
 *
 * @example
 * <FadeIn delay={0.2}>
 *   <Card>콘텐츠</Card>
 * </FadeIn>
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: FadeInProps) {
  // prefers-reduced-motion 설정을 감지하여 모션 민감 사용자 배려
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      // 초기 상태: 투명하고 살짝 아래에 위치 (모션 감소 시 즉시 표시)
      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
      // 뷰포트 진입 시: 불투명하고 제자리로 이동
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      // 뷰포트를 벗어나도 애니메이션이 리셋되지 않도록 한 번만 실행
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
