#!/bin/bash
# Claude Code Stop 훅 - 작업 완료 알림
#
# 이 스크립트는 Claude Code가 Stop 이벤트를 발생시킬 때 실행됩니다.
# Claude가 응답을 완료했을 때 수행한 작업 요약과 함께 Slack 알림을 보냅니다.

# jq 경로 설정 (bash PATH에 포함되도록)
export PATH="$HOME/bin:$PATH"

# .env.local 파일에서 Slack 웹훅 URL 로드
if [ -f "$CLAUDE_PROJECT_DIR/.env.local" ]; then
    source "$CLAUDE_PROJECT_DIR/.env.local"
else
    echo "오류: .env.local 파일을 찾을 수 없습니다: $CLAUDE_PROJECT_DIR/.env.local" >&2
    exit 1
fi

# Slack 웹훅 URL 확인
if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다." >&2
    exit 1
fi

# 프로젝트명 추출
PROJECT_NAME=$(basename "$CLAUDE_PROJECT_DIR")

# 현재 시간
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# JSON 입력 전체 읽기
INPUT=$(cat)

# 실제 입력 JSON 구조 확인용 덤프 (디버깅 후 제거 예정)
echo "DEBUG: FULL INPUT = $INPUT" >&2

# 이벤트명 추출
REASON=$(echo "$INPUT" | jq -r '.hook_event_name // ""')

# transcript에서 마지막 assistant 메시지 텍스트 추출
# content가 배열인 경우(tool_use 포함) text 타입만 모아서 합치고,
# 문자열인 경우 그대로 사용
SUMMARY=$(echo "$INPUT" | jq -r '
  [ .transcript[]? | select(.role == "assistant") ] | last
  | .content
  | if type == "array" then
      [ .[] | select(.type == "text") | .text ] | join("\n")
    else
      .
    end
  // ""
')

# 요약이 비어있으면 기본 메시지 사용
if [ -z "$SUMMARY" ]; then
    SUMMARY="작업 요약을 가져올 수 없습니다."
fi

# 요약이 너무 길면 500자로 자르고 말줄임표 추가
MAX_LEN=500
if [ ${#SUMMARY} -gt $MAX_LEN ]; then
    SUMMARY="${SUMMARY:0:$MAX_LEN}..."
fi

# 디버깅을 위한 변수 출력 (stderr로 출력)
echo "DEBUG: REASON = '$REASON'" >&2
echo "DEBUG: PROJECT_NAME = '$PROJECT_NAME'" >&2
echo "DEBUG: TIMESTAMP = '$TIMESTAMP'" >&2
echo "DEBUG: SUMMARY (first 100) = '${SUMMARY:0:100}'" >&2

# jq 출력을 파이프로 curl에 직접 전달 (변수 경유 시 인코딩 손실 방지)
jq -n \
  --arg project "$PROJECT_NAME" \
  --arg reason "$REASON" \
  --arg timestamp "$TIMESTAMP" \
  --arg summary "$SUMMARY" \
  '{
    channel: "#claude-code-alarm",
    username: "Claude Code",
    icon_emoji: ":white_check_mark:",
    text: ("✅ 작업 완료 알림\n\n프로젝트: " + $project + "\n시간: " + $timestamp + "\n\n📋 *작업 요약*\n" + $summary)
  }' \
| curl -X POST \
    -H "Content-Type: application/json" \
    --data-binary @- \
    "$SLACK_WEBHOOK_URL" > /dev/null 2>&1

# 성공 여부 확인
if [ $? -eq 0 ]; then
    echo "Slack 알림이 성공적으로 전송되었습니다." >&2
else
    echo "Slack 알림 전송에 실패했습니다." >&2
    exit 1
fi
