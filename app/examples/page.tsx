/**
 * 예제 인덱스 페이지
 *
 * 스타터킷에 포함된 모든 예제를 카드 그리드로 소개합니다.
 * 각 카드는 해당 예제 페이지로 이동하는 링크를 포함합니다.
 */

import type { Metadata } from "next";
import { BarChart3, Database, Smartphone, Sparkles } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "예제",
  description: "스타터킷의 다양한 기능을 직접 체험해보세요.",
};

// 예제 카드 데이터
const EXAMPLE_PAGES = [
  {
    href: "/examples/animations",
    icon: Sparkles,
    title: "애니메이션",
    description:
      "Motion(구 Framer Motion)을 활용한 스크롤 애니메이션, 제스처, 레이아웃 전환 예제",
    badge: "motion",
  },
  {
    href: "/examples/charts",
    icon: BarChart3,
    title: "차트",
    description:
      "Recharts(shadcn/ui 통합)와 Chart.js(전문 Canvas 렌더링)를 활용한 다양한 차트 예제",
    badge: "recharts · chart.js",
  },
  {
    href: "/examples/responsive",
    icon: Smartphone,
    title: "반응형 로직",
    description:
      "react-responsive의 useMediaQuery로 JS 레벨에서 화면 크기에 따른 컴포넌트 분기 처리",
    badge: "react-responsive",
  },
  {
    href: "/examples/storage",
    icon: Database,
    title: "브라우저 저장소",
    description:
      "usehooks-ts의 useLocalStorage로 SSR 안전하게 사용자 설정을 localStorage에 저장하고 복원",
    badge: "usehooks-ts",
  },
] as const;

export default function ExamplesPage() {
  return (
    <div className="flex w-full justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* 페이지 제목 */}
        <FadeIn>
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight">예제 목록</h1>
            <p className="text-muted-foreground">
              스타터킷에 포함된 기능을 직접 체험해보세요.
            </p>
          </div>
        </FadeIn>

        {/* 예제 카드 그리드 */}
        <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {EXAMPLE_PAGES.map((example) => {
            const Icon = example.icon;
            return (
              <StaggerItem key={example.href}>
                <Link href={example.href} className="group block h-full">
                  <Card className="h-full transition-all group-hover:border-primary/50 group-hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                          {example.badge}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {example.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </div>
  );
}
