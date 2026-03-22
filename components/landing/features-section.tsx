/**
 * 랜딩 페이지 기능 소개 섹션 (서버 컴포넌트)
 *
 * 스타터킷의 주요 기능을 Card 그리드로 소개합니다.
 * - 모바일: 1열, 태블릿(sm): 2열, 데스크탑(lg): 4열
 * - StaggerChildren으로 카드가 순차적으로 등장하는 애니메이션 효과
 * - FEATURES 상수에서 데이터를 가져와 렌더링합니다.
 */

import {
  BarChart3,
  Database,
  Layers,
  Moon,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURES } from "@/lib/constants";

// lucide-react 아이콘명을 실제 컴포넌트로 매핑하는 딕셔너리
const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Palette,
  Layers,
  Moon,
  Sparkles,
  BarChart3,
  Smartphone,
  Database,
};

export function FeaturesSection() {
  return (
    <section className="bg-muted/30 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* 섹션 제목 */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              모든 기능이 사전 구성되어 있습니다
            </h2>
            <p className="text-muted-foreground">
              프로젝트를 처음부터 설정하는 시간을 아끼고, 비즈니스 로직에
              집중하세요.
            </p>
          </div>
        </FadeIn>

        {/* 기능 카드 그리드 */}
        <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            // 아이콘명으로 lucide-react 아이콘 컴포넌트를 가져옵니다.
            const Icon = ICON_MAP[feature.icon] ?? Zap;

            return (
              <StaggerItem key={feature.title}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    {/* 아이콘 */}
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
