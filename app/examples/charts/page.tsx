/**
 * 차트 예제 페이지
 *
 * Recharts(shadcn/ui 통합)와 Chart.js 두 가지 차트 라이브러리의 예제를 보여줍니다.
 * - Recharts: CSS variables 기반 다크모드 자동 지원, shadcn/ui 통합
 * - Chart.js: Canvas 기반, 대규모 데이터 성능, 풍부한 플러그인 생태계
 */

import type { Metadata } from "next";

import {
  ChartJsBarChart,
  ChartJsDoughnutChart,
  ChartJsLineChart,
  ChartJsRadarChart,
} from "@/components/examples/chartjs-demos";
import {
  RechartsAreaChart,
  RechartsBarChart,
  RechartsLineChart,
  RechartsPieChart,
} from "@/components/examples/recharts-demos";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "차트",
  description: "Recharts와 Chart.js를 활용한 다양한 차트 예제",
};

export default function ChartsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* 페이지 제목 */}
      <FadeIn>
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">차트 예제</h1>
          <p className="text-muted-foreground">
            Recharts(shadcn/ui 통합)와 Chart.js 두 가지 전문 차트 라이브러리
            예제입니다.
          </p>
        </div>
      </FadeIn>

      {/* 라이브러리 선택 탭 */}
      <FadeIn delay={0.1}>
        <Tabs defaultValue="recharts">
          <TabsList className="mb-6">
            <TabsTrigger value="recharts" className="gap-2">
              Recharts
              <Badge variant="secondary" className="text-xs">
                shadcn/ui
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="chartjs" className="gap-2">
              Chart.js
              <Badge variant="secondary" className="text-xs">
                Canvas
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* ─── Recharts 탭 ─────────────────────────────────── */}
          <TabsContent value="recharts" className="space-y-6">
            <p className="text-sm text-muted-foreground">
              shadcn/ui chart 컴포넌트(Recharts 기반). CSS variables로 다크모드
              자동 지원. 테마 토글 시 차트 색상이 자동으로 전환됩니다.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bar Chart</CardTitle>
                  <CardDescription>월별 판매 데이터</CardDescription>
                </CardHeader>
                <CardContent>
                  <RechartsBarChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Line Chart</CardTitle>
                  <CardDescription>월별 방문자 & 판매 추이</CardDescription>
                </CardHeader>
                <CardContent>
                  <RechartsLineChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Area Chart</CardTitle>
                  <CardDescription>월별 수익 누적 (그라디언트)</CardDescription>
                </CardHeader>
                <CardContent>
                  <RechartsAreaChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pie / Donut Chart</CardTitle>
                  <CardDescription>카테고리별 판매 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <RechartsPieChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ─── Chart.js 탭 ──────────────────────────────────── */}
          <TabsContent value="chartjs" className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Chart.js (react-chartjs-2). Canvas 기반으로 대규모 데이터셋에서
              높은 성능을 제공합니다. Bar, Line, Doughnut, Radar 차트를
              지원합니다.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bar Chart</CardTitle>
                  <CardDescription>분기별 연도 비교</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartJsBarChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Line Chart</CardTitle>
                  <CardDescription>웹 & 모바일 방문자 추이</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartJsLineChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Doughnut Chart</CardTitle>
                  <CardDescription>유입 경로 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartJsDoughnutChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Radar Chart</CardTitle>
                  <CardDescription>프로젝트 지표 비교</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartJsRadarChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
