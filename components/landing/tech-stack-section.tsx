/**
 * 랜딩 페이지 기술 스택 섹션 (서버 컴포넌트)
 *
 * 프로젝트에 사용된 기술 스택을 Badge 형태로 나열합니다.
 * TECH_STACK 상수에서 데이터를 가져와 렌더링합니다.
 */

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TECH_STACK } from "@/lib/constants";

export function TechStackSection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center">
            {/* 섹션 구분선 */}
            <div className="mb-8 flex items-center gap-4">
              <Separator className="flex-1" />
              <p className="text-sm font-medium text-muted-foreground">
                기술 스택
              </p>
              <Separator className="flex-1" />
            </div>

            {/* 기술 스택 Badge 목록 */}
            <div className="flex flex-wrap justify-center gap-2">
              {TECH_STACK.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
