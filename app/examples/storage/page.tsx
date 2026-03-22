/**
 * 브라우저 저장소 예제 페이지
 *
 * usehooks-ts의 useLocalStorage를 사용하여
 * SSR 안전하게 사용자 데이터를 localStorage에 저장하는 예제를 보여줍니다.
 */

import type { Metadata } from "next";

import {
  CounterDemo,
  FormPersistDemo,
  UserPrefsDemo,
} from "@/components/examples/storage-demos";
import { SectionHeader } from "@/components/examples/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "브라우저 저장소",
  description: "usehooks-ts의 useLocalStorage를 활용한 브라우저 저장소 예제",
};

export default function StoragePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <FadeIn>
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            브라우저 저장소
          </h1>
          <p className="text-muted-foreground">
            usehooks-ts의 useLocalStorage로 SSR 안전하게 사용자 데이터를
            브라우저 localStorage에 저장합니다. 새로고침해도 데이터가 유지되는
            것을 확인해보세요.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        <section>
          <SectionHeader
            title="카운터 (기본 사용법)"
            description="useLocalStorage로 숫자 값을 저장합니다. useState와 동일한 API를 사용합니다."
          />
          <CounterDemo />
        </section>

        <Separator />

        <section>
          <SectionHeader
            title="사용자 설정 저장"
            description="복잡한 객체 타입도 자동으로 JSON 직렬화/역직렬화하여 저장합니다."
          />
          <UserPrefsDemo />
        </section>

        <Separator />

        <section>
          <SectionHeader
            title="폼 자동 저장 (임시저장)"
            description="입력 내용을 실시간으로 저장하여 페이지 이탈 후에도 복원합니다."
          />
          <FormPersistDemo />
        </section>
      </div>
    </div>
  );
}
