/**
 * 예제 페이지 섹션 구분 헤더 컴포넌트
 *
 * 각 예제 섹션의 제목과 설명을 표시하는 공통 헤더입니다.
 * animations, responsive, storage, charts 예제 페이지에서 공유합니다.
 */

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
