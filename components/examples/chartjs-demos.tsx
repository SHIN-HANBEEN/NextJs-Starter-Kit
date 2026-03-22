"use client";

/**
 * Chart.js 차트 데모 컴포넌트
 *
 * react-chartjs-2를 통해 Chart.js를 React에서 사용하는 예제입니다.
 * Chart.js는 Canvas 기반으로 대규모 데이터셋에서 Recharts보다 높은 성능을 제공합니다.
 *
 * 주의: Chart.js는 필요한 요소를 사전에 등록(register)해야 합니다.
 * 주의: Canvas 렌더링 특성상 CSS 변수를 직접 읽지 못하므로,
 *       useTheme()으로 현재 테마를 감지하여 색상을 분기합니다.
 *
 * 포함된 차트:
 * 1. Bar Chart: 분기별 실적
 * 2. Line Chart: 다중 데이터 라인
 * 3. Doughnut Chart: 도넛 차트
 * 4. Radar Chart: 레이더 차트
 */

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";

import { useMounted } from "@/hooks/use-mounted";

// Chart.js 사용할 요소를 명시적으로 등록합니다 (트리쉐이킹 지원)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

// ─── 모듈 레벨 상수 데이터 ─────────────────────────────────────────
// 리렌더 시마다 객체가 재생성되지 않도록 컴포넌트 외부에 선언합니다.
const BAR_DATA = {
  labels: ["1분기", "2분기", "3분기", "4분기"],
  datasets: [
    {
      label: "2024년",
      data: [650, 590, 800, 810],
      backgroundColor: "rgba(99, 102, 241, 0.7)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 1,
      borderRadius: 4,
    },
    {
      label: "2025년",
      data: [700, 620, 850, 900],
      backgroundColor: "rgba(168, 85, 247, 0.7)",
      borderColor: "rgba(168, 85, 247, 1)",
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
};

const LINE_LABELS = ["1월", "2월", "3월", "4월", "5월", "6월"];
const LINE_DATA = {
  labels: LINE_LABELS,
  datasets: [
    {
      label: "웹 방문자",
      data: [1200, 1900, 3000, 2500, 2000, 3200],
      borderColor: "rgba(99, 102, 241, 1)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    },
    {
      label: "모바일 방문자",
      data: [800, 1200, 2100, 1800, 1600, 2400],
      borderColor: "rgba(34, 197, 94, 1)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

const DOUGHNUT_DATA = {
  labels: ["직접 방문", "검색", "소셜", "이메일", "기타"],
  datasets: [
    {
      data: [35, 28, 18, 12, 7],
      backgroundColor: [
        "rgba(99, 102, 241, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(251, 146, 60, 0.8)",
        "rgba(148, 163, 184, 0.8)",
      ],
      borderWidth: 2,
      borderColor: "transparent",
      hoverOffset: 6,
    },
  ],
};

const RADAR_DATA = {
  labels: ["성능", "접근성", "SEO", "PWA", "모범 사례", "보안"],
  datasets: [
    {
      label: "프로젝트 A",
      data: [95, 88, 92, 70, 85, 90],
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "rgba(99, 102, 241, 1)",
      pointBackgroundColor: "rgba(99, 102, 241, 1)",
      borderWidth: 2,
    },
    {
      label: "프로젝트 B",
      data: [75, 95, 80, 85, 90, 88],
      backgroundColor: "rgba(168, 85, 247, 0.2)",
      borderColor: "rgba(168, 85, 247, 1)",
      pointBackgroundColor: "rgba(168, 85, 247, 1)",
      borderWidth: 2,
    },
  ],
};

// ─── 테마별 색상 반환 함수 ────────────────────────────────────────
// Canvas 렌더링 특성상 CSS 변수를 직접 읽지 못하므로, 테마에 따라 색상을 분기합니다.
function getThemeColors(isDark: boolean) {
  return {
    gridColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    tickColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
  };
}

// ─── 공통 차트 옵션 생성 함수 ──────────────────────────────────────
function getCommonOptions(title: string, isDark: boolean) {
  const { gridColor, tickColor } = getThemeColors(isDark);
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: false, text: title },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { font: { size: 11 }, color: tickColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { font: { size: 11 }, color: tickColor },
      },
    },
  };
}

// ─── 1. Bar Chart ────────────────────────────────────────────────
export function ChartJsBarChart() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  // 마운트 전에는 기본(라이트) 테마로 렌더링하여 hydration 불일치 방지
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="h-60">
      <Bar data={BAR_DATA} options={getCommonOptions("분기별 실적", isDark)} />
    </div>
  );
}

// ─── 2. Line Chart ────────────────────────────────────────────────
export function ChartJsLineChart() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="h-60">
      <Line data={LINE_DATA} options={getCommonOptions("방문자 추이", isDark)} />
    </div>
  );
}

// ─── 3. Doughnut Chart ────────────────────────────────────────────
export function ChartJsDoughnutChart() {
  return (
    <div className="h-60">
      <Doughnut
        data={DOUGHNUT_DATA}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right" as const },
          },
          cutout: "60%",
        }}
      />
    </div>
  );
}

// ─── 4. Radar Chart ────────────────────────────────────────────────
export function ChartJsRadarChart() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const { gridColor, tickColor } = getThemeColors(isDark);

  return (
    <div className="h-60">
      <Radar
        data={RADAR_DATA}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { stepSize: 20, font: { size: 10 }, color: tickColor },
              grid: { color: gridColor },
            },
          },
          plugins: {
            legend: { position: "bottom" as const },
          },
        }}
      />
    </div>
  );
}
