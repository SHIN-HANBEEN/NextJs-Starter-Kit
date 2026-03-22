"use client";

/**
 * Recharts 차트 데모 컴포넌트
 *
 * shadcn/ui의 chart 컴포넌트(Recharts 기반)를 활용한 차트 예제입니다.
 * CSS variables 기반으로 다크/라이트 모드 전환이 자동으로 지원됩니다.
 *
 * 포함된 차트:
 * 1. Bar Chart: 월별 판매 데이터
 * 2. Line Chart: 방문자 추이
 * 3. Area Chart: 수익 누적
 * 4. Pie Chart: 카테고리별 비율
 */

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── 공통 샘플 데이터 ────────────────────────────────────────────
const MONTHLY_DATA = [
  { month: "1월", 판매: 400, 방문자: 2400, 수익: 240 },
  { month: "2월", 판매: 300, 방문자: 1398, 수익: 221 },
  { month: "3월", 판매: 600, 방문자: 9800, 수익: 380 },
  { month: "4월", 판매: 800, 방문자: 3908, 수익: 430 },
  { month: "5월", 판매: 500, 방문자: 4800, 수익: 380 },
  { month: "6월", 판매: 900, 방문자: 3800, 수익: 430 },
];

const PIE_DATA = [
  { name: "전자제품", value: 400 },
  { name: "의류", value: 300 },
  { name: "식품", value: 300 },
  { name: "도서", value: 200 },
];

// Tailwind CSS oklch 팔레트와 조화되는 차트 색상 (CSS variable 직접 참조)
// globals.css에서 oklch() 포맷으로 정의되어 있으므로 hsl() 래핑 없이 var()로 직접 사용합니다.
const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

// Tooltip 공통 스타일 — CSS 변수를 직접 참조하여 다크/라이트 모드 자동 지원
const TOOLTIP_STYLE = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--popover-foreground)",
};

// ─── 1. Bar Chart ────────────────────────────────────────────────
export function RechartsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          className="fill-muted-foreground"
        />
        <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Bar dataKey="판매" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── 2. Line Chart ────────────────────────────────────────────────
export function RechartsLineChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend />
        <Line
          type="monotone"
          dataKey="방문자"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="판매"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── 3. Area Chart ────────────────────────────────────────────────
export function RechartsAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <defs>
          {/* 그라디언트 정의 */}
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Area
          type="monotone"
          dataKey="수익"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── 4. Pie Chart ────────────────────────────────────────────────
export function RechartsPieChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={PIE_DATA}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {PIE_DATA.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
