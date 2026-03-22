"use client";

/**
 * 자식 요소 순차 등장 애니메이션 컴포넌트
 *
 * 여러 자식 요소가 순서대로(stagger) 하나씩 나타나는 효과를 적용합니다.
 * 카드 그리드, 목록 항목 등 반복 요소에 시각적 리듬감을 부여합니다.
 *
 * 사용법:
 * - StaggerChildren: 부모 컨테이너 (motion variants의 staggerChildren 설정)
 * - StaggerItem: 각 자식 요소 래퍼 (순차 등장 대상)
 *
 * @param staggerDelay - 자식 요소 간 등장 간격 (초 단위, 기본값: 0.1)
 * @param className - 추가 CSS 클래스
 *
 * @example
 * <StaggerChildren>
 *   {items.map((item) => (
 *     <StaggerItem key={item.id}>
 *       <Card>{item.content}</Card>
 *     </StaggerItem>
 *   ))}
 * </StaggerChildren>
 */

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactNode } from "react";

// 부모 컨테이너 variants: 자식 요소의 등장 간격을 제어합니다.
const containerVariants = (staggerDelay: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // 자식 요소들이 순차적으로 애니메이션되도록 staggerChildren 설정
      staggerChildren: staggerDelay,
      // 부모가 등장한 후 자식 등장 시작
      delayChildren: 0.1,
    },
  },
});

// 자식 요소 variants: 각 항목의 개별 등장 애니메이션
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

// 부모 컨테이너 컴포넌트
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerChildrenProps) {
  // prefers-reduced-motion 설정을 감지하여 모션 민감 사용자 배려
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={containerVariants(staggerDelay)}
      // 모션 감소 시 애니메이션 없이 즉시 표시
      initial={shouldReduce ? "show" : "hidden"}
      whileInView="show"
      // 뷰포트에 진입할 때 한 번만 실행
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 자식 요소 컴포넌트 (StaggerChildren 내부에서 사용)
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
