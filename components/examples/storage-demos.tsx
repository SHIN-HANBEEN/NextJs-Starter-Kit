"use client";

/**
 * 브라우저 저장소 데모 컴포넌트
 *
 * usehooks-ts의 useLocalStorage 훅을 사용하여
 * SSR 안전하게 사용자 데이터를 localStorage에 저장하는 예제입니다.
 *
 * 포함된 데모:
 * 1. CounterDemo: 단순 카운터 (새로고침 후에도 유지)
 * 2. UserPrefsDemo: 복잡한 객체 타입 사용자 설정 저장
 * 3. FormPersistDemo: 폼 입력 내용 자동 저장
 */

import { Trash2 } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// ─── 1. 카운터 데모 ─────────────────────────────────────────────
// 가장 단순한 사용 예: 숫자 값을 localStorage에 저장합니다.
export function CounterDemo() {
  // useLocalStorage<T>(key, defaultValue) — useState와 동일한 API
  // 페이지를 새로고침해도 마지막 값이 유지됩니다.
  const [count, setCount] = useLocalStorage<number>("demo-counter", 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        카운터 값은 localStorage에 저장됩니다. 페이지를 새로고침해도 값이
        유지됩니다.
      </p>

      <div className="flex items-center gap-4">
        {/* 현재 카운트 표시 */}
        <div className="flex size-16 items-center justify-center rounded-xl bg-primary/10 text-2xl font-bold text-primary">
          {count}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCount((c) => c - 1)}
            >
              −1
            </Button>
            <Button size="sm" onClick={() => setCount((c) => c + 1)}>
              +1
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 10)}>
              +10
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1 text-destructive hover:text-destructive"
            onClick={() => setCount(0)}
          >
            <Trash2 className="size-3" />
            초기화
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        localStorage 키: <code className="rounded bg-muted px-1">demo-counter</code>
      </p>
    </div>
  );
}

// ─── 2. 사용자 설정 저장 데모 ──────────────────────────────────────
// 복잡한 객체 타입을 localStorage에 직렬화(JSON)하여 저장합니다.
interface UserPreferences {
  name: string;
  language: string;
  notifications: boolean;
  fontSize: "small" | "medium" | "large";
}

const DEFAULT_PREFS: UserPreferences = {
  name: "",
  language: "ko",
  notifications: true,
  fontSize: "medium",
};

export function UserPrefsDemo() {
  const [prefs, setPrefs] = useLocalStorage<UserPreferences>(
    "demo-user-prefs",
    DEFAULT_PREFS
  );

  // 설정의 특정 필드만 업데이트하는 헬퍼 함수
  const updatePref = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        설정을 변경하면 즉시 localStorage에 저장됩니다. 페이지를 새로고침해도
        설정이 유지됩니다.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* 이름 입력 */}
        <div className="space-y-2">
          <Label htmlFor="pref-name">이름</Label>
          <Input
            id="pref-name"
            placeholder="이름을 입력하세요"
            value={prefs.name}
            onChange={(e) => updatePref("name", e.target.value)}
          />
        </div>

        {/* 언어 선택 */}
        <div className="space-y-2">
          <Label>언어</Label>
          <Select
            value={prefs.language}
            onValueChange={(value) => updatePref("language", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ko">한국어</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 폰트 크기 선택 */}
        <div className="space-y-2">
          <Label>글자 크기</Label>
          <Select
            value={prefs.fontSize}
            onValueChange={(value) =>
              updatePref("fontSize", value as UserPreferences["fontSize"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">작게</SelectItem>
              <SelectItem value="medium">보통</SelectItem>
              <SelectItem value="large">크게</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 알림 토글 */}
        <div className="flex items-center justify-between rounded-md border p-3">
          <Label htmlFor="pref-notif" className="cursor-pointer">
            알림 수신
          </Label>
          <Switch
            id="pref-notif"
            checked={prefs.notifications}
            onCheckedChange={(checked) => updatePref("notifications", checked)}
          />
        </div>
      </div>

      {/* 저장된 값 미리보기 */}
      <div className="rounded-md bg-muted p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          localStorage 저장 값 (JSON):
        </p>
        <pre className="overflow-auto text-xs">
          {JSON.stringify(prefs, null, 2)}
        </pre>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="gap-1 text-destructive hover:text-destructive"
        onClick={() => setPrefs(DEFAULT_PREFS)}
      >
        <Trash2 className="size-3" />
        설정 초기화
      </Button>
    </div>
  );
}

// ─── 3. 폼 자동 저장 데모 ──────────────────────────────────────────
// 폼 입력 내용을 실시간으로 저장하여 페이지 이탈 후 복원합니다.
interface DraftForm {
  title: string;
  content: string;
}

export function FormPersistDemo() {
  const [draft, setDraft] = useLocalStorage<DraftForm>("demo-form-draft", {
    title: "",
    content: "",
  });

  const clearDraft = () => setDraft({ title: "", content: "" });

  const hasDraft = draft.title.trim() || draft.content.trim();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        입력 내용이 실시간으로 저장됩니다. 탭을 닫거나 새로고침해도 입력했던
        내용이 복원됩니다.
      </p>

      {/* 임시저장 상태 표시 */}
      <div className="flex items-center gap-2">
        <Badge variant={hasDraft ? "default" : "secondary"}>
          {hasDraft ? "임시저장 있음" : "임시저장 없음"}
        </Badge>
        {hasDraft && (
          <Button
            size="sm"
            variant="ghost"
            className="h-6 gap-1 px-2 text-xs text-destructive hover:text-destructive"
            onClick={clearDraft}
          >
            <Trash2 className="size-3" />
            삭제
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="draft-title">제목</Label>
          <Input
            id="draft-title"
            placeholder="글 제목을 입력하세요"
            value={draft.title}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="draft-content">내용</Label>
          <Textarea
            id="draft-content"
            placeholder="내용을 입력하세요..."
            value={draft.content}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, content: e.target.value }))
            }
            className="min-h-24"
          />
        </div>
      </div>
    </div>
  );
}
