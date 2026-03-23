---
name: 프로젝트 컨벤션 및 패턴
description: claude-nextjs-starters 프로젝트의 주요 아키텍처 결정, 컨벤션, 반복 패턴
type: project
---

## 프로젝트 구조 핵심 패턴

- RSC/클라이언트 분리: 랜딩 섹션은 서버 컴포넌트, 인터랙션(애니메이션, 저장소, 반응형 감지)은 클라이언트 컴포넌트
- `useMounted()` 훅을 react-responsive, localStorage, 테마 토글에 일관되게 적용 중
- `lib/constants.ts`에서 NAV_LINKS, MOBILE_NAV_SECTIONS, FEATURES 등 모든 정적 데이터 중앙 관리
- SafeArea: Header에 `paddingTop: var(--safe-area-top)`, Footer에 `paddingBottom: var(--safe-area-bottom)` 인라인 스타일로 적용
- 테마: oklch 색상 토큰, `@custom-variant dark (&:is(.dark *))` 패턴

## 반복 발생하는 패턴

- SectionHeader 컴포넌트가 animations/page.tsx, responsive/page.tsx, storage/page.tsx 세 파일에 중복 정의됨 (공용 컴포넌트로 추출 권장)
- Chart.js 차트 데이터가 컴포넌트 함수 안에 인라인으로 정의 (렌더마다 재생성 — useMemo 또는 모듈 레벨 상수로 이동 권장)
- Recharts tooltip에 `hsl(var(--...))` 문자열 사용 — globals.css의 색상이 oklch인데 hsl로 참조 (색상 불일치 가능성)

## ESLint 이슈 (현황)

- `hooks/use-mounted.ts`: `react-hooks/set-state-in-effect` 에러 (useEffect 내 setState 직접 호출)
- 미사용 import 경고 11건: animation-demos.tsx, recharts-demos.tsx, responsive-demos.tsx, storage-demos.tsx, charts/page.tsx

**Why:** 스타터킷 특성상 예제 코드가 많아 import 잔여물이 생기기 쉬움
**How to apply:** 코드 리뷰 시 이 두 패턴을 우선 체크

## 접근성 패턴 (수정 이력)

- Sheet(=Radix Dialog) 사용 시 `SheetDescription`이 없으면 `Warning: Missing Description or aria-describedby` 콘솔 경고 발생
- 해결 패턴: `<SheetDescription className="sr-only">` 로 시각적으로 숨기되 스크린리더에는 노출
- 히어로 타이틀 줄바꿈 문제: `max-w` 확장 + `text-balance` 병행 적용이 권장 패턴 (CSS가 브라우저에서 균등 분배 처리)
