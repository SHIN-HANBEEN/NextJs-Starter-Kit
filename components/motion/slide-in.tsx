"use client";

/**
 * 슬라이드인 애니메이션 래퍼 컴포넌트
 *
 * 자식 요소가 뷰포트에 진입할 때 지정한 방향에서 슬라이드하며 나타나는 효과를 적용합니다.
 * left, right, top, bottom 4가지 방향을 지원합니다.
 *
 * @param direction - 슬라이드 진입 방향 (기본값: "left")
 * @param delay - 애니메이션 시작 지연 시간 (초 단위, 기본값: 0)
 * @param duration - 애니메이션 지속 시간 (초 단위, 기본값: 0.5)
 * @param distance - 슬라이드 이동 거리 (px, 기본값: 40)
 * @param className - 추가 CSS 클래스
 *
 * @example
 * <SlideIn direction="right" delay={0.1}>
 *   <Card>콘텐츠</Card>
 * </SlideIn>
 */

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

// 방향별 초기 오프셋 계산 함수
function getInitialOffset(
  direction: Direction,
  distance: number
): { x?: number; y?: number } {
  switch (direction) {
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
    case "top":
      return { y: -distance };
    case "bottom":
      return { y: distance };
  }
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.5,
  distance = 40,
  className,
}: SlideInProps) {
  const initialOffset = getInitialOffset(direction, distance);

  return (
    <motion.div
      // 초기 상태: 투명하고 지정 방향으로 오프셋
      initial={{ opacity: 0, ...initialOffset }}
      // 뷰포트 진입 시: 불투명하고 제자리로 이동
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // 한 번만 실행 (스크롤을 올려도 리셋되지 않음)
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
