"use client";

/**
 * 애니메이션 데모 컴포넌트 모음
 *
 * motion 라이브러리(구 Framer Motion)를 사용한 다양한 애니메이션 예제입니다.
 * 모든 데모는 클라이언트 컴포넌트여야 하므로 "use client" 지시어를 사용합니다.
 *
 * 포함된 데모:
 * 1. FadeInDemo: 스크롤 기반 페이드인 애니메이션
 * 2. SlideInDemo: 방향별 슬라이드인 애니메이션
 * 3. GestureDemo: 호버/탭 제스처 애니메이션
 * 4. LayoutDemo: 레이아웃 애니메이션 (항목 추가/제거)
 */

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ─── 1. FadeIn 데모 ───────────────────────────────────────────────
export function FadeInDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        스크롤 시 뷰포트에 진입할 때 서서히 나타나는 효과입니다.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 0.15, 0.3].map((delay, i) => (
          <FadeIn key={i} delay={delay}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="font-semibold">카드 {i + 1}</p>
                <p className="text-xs text-muted-foreground">delay: {delay}s</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// ─── 2. SlideIn 데모 ───────────────────────────────────────────────
export function SlideInDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        지정한 방향에서 슬라이드하며 나타나는 효과입니다.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["left", "right", "top", "bottom"] as const).map((dir) => (
          <SlideIn key={dir} direction={dir}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-sm font-medium">← {dir}</p>
              </CardContent>
            </Card>
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

// ─── 3. Stagger 데모 ───────────────────────────────────────────────
export function StaggerDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        여러 항목이 순차적으로 등장하는 Stagger 효과입니다.
      </p>
      <StaggerChildren className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <StaggerItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
              {i + 1}
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}

// ─── 4. 제스처 인터랙션 데모 ──────────────────────────────────────
export function GestureDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        호버, 클릭(탭) 시 반응하는 제스처 애니메이션입니다.
      </p>
      <div className="flex flex-wrap gap-4">
        {/* 호버 시 확대 */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex size-24 cursor-pointer items-center justify-center rounded-xl bg-primary/10 text-sm font-medium text-primary select-none"
        >
          호버 / 탭
        </motion.div>

        {/* 드래그 가능 */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.05, cursor: "grabbing" }}
          className="flex size-24 cursor-grab items-center justify-center rounded-xl bg-secondary text-sm font-medium select-none"
        >
          드래그
        </motion.div>

        {/* 회전 */}
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          className="flex size-24 cursor-pointer items-center justify-center rounded-xl bg-muted text-sm font-medium select-none"
        >
          회전
        </motion.div>
      </div>
    </div>
  );
}

// ─── 5. AnimatePresence 데모 ──────────────────────────────────────
export function PresenceDemo() {
  // 목록에 항목을 추가/제거하며 AnimatePresence로 exit 애니메이션을 보여줍니다.
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const [nextId, setNextId] = useState(4);

  const addItem = () => {
    setItems((prev) => [...prev, nextId]);
    setNextId((prev) => prev + 1);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        AnimatePresence로 항목 추가/제거 시 부드러운 enter/exit 애니메이션을
        적용합니다.
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={addItem}>
          항목 추가
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => items.length > 0 && removeItem(items[items.length - 1])}
          disabled={items.length === 0}
        >
          마지막 항목 제거
        </Button>
      </div>

      {/* AnimatePresence: 언마운트 시 exit 애니메이션을 실행합니다 */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {items.map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              onClick={() => removeItem(id)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-destructive/10 hover:text-destructive"
              title="클릭하여 제거"
            >
              {id}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">항목이 없습니다.</p>
      )}
    </div>
  );
}
