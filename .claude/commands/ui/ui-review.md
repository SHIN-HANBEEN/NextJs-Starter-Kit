---
description: 'playwright mcp 를 활용하여 UI 리뷰를 진행합니다.'
allowed-tools:
  [
    'Bash',
    'mcp__playwright'
  ]
---

# Claude 명령어: review

playwright mcp 를 활용하여 UI 리뷰를 진행합니다.

## 사용법

```
/review
```

## 프로세스

1. playwright mcp 가 등록되어 있는지 확인합니다.
2. 등록되어 있지 않다면 playwright mcp 를 등록합니다.
3. playwright 를 활용하여 ui 의 기능적, ux 적 하자가 있는지 평가합니다.
4. 개선 필요 가능성을 판단합니다.
5. 개선 필요성이 있는 경우 개선 방안을 생각합니다.
6. 개선 방안에 대한 유저 피드백을 요청합니다.
7. 유저가 수정에 대한 승인을 할 시 UI 를 수정합니다.