"use client";

/**
 * 클라이언트 마운트 상태 확인 훅
 *
 * Next.js App Router에서 서버 사이드 렌더링(SSR) 중에는
 * window, document 등 브라우저 API에 접근할 수 없습니다.
 *
 * 이 훅은 컴포넌트가 클라이언트에 마운트되었는지 여부를 반환하며,
 * 다음과 같은 상황에서 hydration 불일치를 방지하기 위해 사용합니다:
 * - 테마 토글 (서버: 기본값, 클라이언트: 저장된 테마)
 * - localStorage 의존 UI
 * - 미디어쿼리 의존 UI
 *
 * @returns {boolean} 클라이언트에 마운트되었으면 true, 아니면 false
 *
 * @example
 * const mounted = useMounted();
 * if (!mounted) return <Skeleton />; // 서버 렌더링 시 스켈레톤 표시
 */

import { useEffect, useState } from "react";

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // useEffect는 클라이언트에서만 실행되므로, 실행 즉시 mounted를 true로 설정합니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
