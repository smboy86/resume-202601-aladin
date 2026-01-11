# resume-202601-aladin

2026.01 알라딘 입사 지원, 과제

## TODOs

### 기능

- [x] 사용자 또는 조직만 검색
- [x] 계정 이름, 성명 또는 메일로 검색
- [x] 사용자가 소유한 리포지토리 수로 검색
- [x] 위치별 검색 - 위치가 한글 혹은 로컬 언어일 경우에는 일치하지 않는 경우 필터가 되지 않음
- [x] 사용 언어로 검색
- [x] 개인 계정을 만든 시점별 검색
- [x] 팔로워 수로 검색
- [ ] 후원 가능 여부를 기준으로 검색

### 제한 조건

- [ ] 시스템 연동 다크 모드 지원
- [ ] 스크린: SM / MD / LG / XL 지원
- [x] 머터리얼 디자인 칼라 팔레트 지원
- [ ] 폰트 폴백: 애플 기본 > Noto
- [ ] UI 컴포넌트는 MUI 사용, UI 컴포넌트 레이아웃은 Tailwind CSS 사용
- [ ] 정렬 조건: 기본, followers, repositories, joined 지원 + DESC
- [ ] 페이징 처리: SSR 로 첫페이지 선 랜더링, 이후 CSR 로 무한 스크롤
- [ ] 사용자 아바타 이미지 처리: HTML5 Canvas + WebAssembly 를 통해 랜더링
- [ ] Jest 를 통한 유닛 테스트 지원
- [ ] Cypress 를 통한 E2E 테스트 지원
- [ ] 모든 GitHub 호출은 서버 라우트에서 Authorization: token 사용
- [ ] 레이트리밋 초과 시 재시도, 남은 쿼터 노출

### 테스트 조건

- [ ] README.md 에 관련 소스를 실행하고 테스트 할 수 있는 방법 제시

### 정밀 테스트 조건

- [ ] 검색 쿼리, 정렬, 페이징 로직
- [ ] 데이터 매핑, 표시 안전성
- [ ] SSR, CSR 경계 로직
- [ ] (+점수) 그외 추가로 안정성을 위한 테스트 조건 코드

### 개발/테스트 환경

- [ ] Clean Architecture + Modularity
- [x] InteliJ Idea + pnpm + turbo
- [x] ESLint + Prettier
- [x] ES2023 + Next.js + TypeScript (Next.js App Router)
- [x] MUI + Tailwind CSS
- [ ] Redux Toolkit
- [ ] Cypress + Jest

## 프로젝트 설치 가이드

1. Next.js(App Router) 프로젝트 생성

```bash
pnpm dlx create-next-app@latest . --ts --app --eslint --tailwind --src-dir --import-alias "@/*" --use-pnpm
```

2. MUI 설치

```bash
pnpm add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

3. Redux Toolkit 설치

```bash
pnpm add @reduxjs/toolkit react-redux
```

4. Jest(유닛 테스트) 설치

```bash
pnpm add -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

5. Cypress(E2E 테스트) 설치

```bash
pnpm add -D cypress
```

6. ESLint + Prettier 추가

```bash
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

7. Turbo 추가

```bash
pnpm add -D turbo
```

## 과제 분석

### 목표

- GitHub REST API 사용자 검색을 통해 사용자/조직 검색 화면 구현
- 총 8가지 검색 기능 제공
  - 사용자 또는 조직만 검색
  - 계정 이름/성명/메일로 검색
  - 사용자가 소유한 리포지토리 수로 검색
  - 위치별 검색
  - 사용 언어로 검색
  - 개인 계정 생성 시점별 검색
  - 팔로워 수로 검색
  - 후원 가능 여부로 검색
- 정렬 조건: 기본, followers, repositories, joined + DESC
- 페이징: SSR로 첫 페이지 선렌더링, 이후 CSR 무한 스크롤
- 사용자 아바타: HTML5 Canvas + WebAssembly로 렌더링
- 다크 모드(시스템 연동), 반응형(SM/MD/LG/XL), 머터리얼 디자인 컬러 팔레트
- 폰트 폴백: 애플 기본 > Noto
- UI: MUI 컴포넌트 + Tailwind CSS 레이아웃
- 테스트: Jest 유닛 테스트, Cypress E2E 테스트
- GitHub 호출은 서버 라우트에서 Authorization: token 사용
- 레이트 리밋 초과 시 재시도 및 남은 쿼터 노출
- 제출물: 전체 소스, README, 실행/테스트 방법, 구현 스펙, MUI+Tailwind 주의점, 사용한 프롬프트(`prompts/used_prompts.md`)

### 주의사항

- SSR/CSR 경계 로직을 명확히 분리하고 테스트해야 함
- 검색 조건 및 정렬/페이징이 GitHub Search Users 쿼리 문법과 정확히 매핑되어야 함
- 레이트 리밋 대응(재시도 전략 + 남은 쿼터 노출) 필수
- Authorization 토큰은 클라이언트에 노출되면 안 됨
- MUI와 Tailwind 병행 시 스타일 우선순위 및 충돌 관리 필요
- Canvas + WebAssembly 아바타 렌더링은 빌드/로딩 전략을 사전에 설계해야 함
- 제출 요건 누락 시 실격 위험(특히 프롬프트 기록)

## 프로젝트 구조/기술 설계안

### 설계 원칙

- Clean Architecture + Modularity 준수
- Next.js App Router 기반 SSR/CSR 혼합 구조
- 테스트 가능성과 확장성을 고려한 계층 분리

### 디렉터리 구조(안)

- `app/`: Next.js App Router 엔트리, 페이지/레이아웃, 서버 라우트
- `src/domain/`: 도메인 모델, 유즈케이스, 인터페이스(포트)
- `src/application/`: 서비스 계층, 유즈케이스 구현, DTO 매핑
- `src/infrastructure/`: GitHub API 클라이언트, 캐싱/레이트리밋 처리, 데이터 소스 구현
- `src/presentation/`: UI 컴포넌트, 페이지 레이아웃, Tailwind 기반 배치
- `src/shared/`: 공통 유틸, 타입, 상수, 에러 처리
- `tests/unit/`: Jest 단위 테스트
- `tests/e2e/`: Cypress E2E 테스트
- `prompts/used_prompts.md`: 사용한 프롬프트 기록

### 핵심 기술 스택

- ES2023 + Next.js(App Router) + TypeScript
- MUI + Tailwind CSS
- Redux Toolkit
- Jest + Cypress
- pnpm + turbo
- ESLint + Prettier

### 데이터 흐름 설계

- 클라이언트는 검색 조건을 쿼리 파라미터로 서버 라우트에 전달
- 서버 라우트에서 GitHub Search Users API 호출, token 인증
- 응답 데이터는 DTO로 매핑 후 프론트에 전달
- 클라이언트는 첫 페이지 SSR 렌더링 후, 이후 페이지는 CSR 무한 스크롤로 요청
- 레이트 리밋 정보는 응답 헤더/바디에 포함하여 UI에서 노출

### SSR/CSR 페이징 설계

- 첫 페이지: `app/` 레벨에서 SSR로 렌더링
- 이후 페이지: 클라이언트에서 Intersection Observer로 추가 요청
- SSR/CSR 경계 로직을 유닛 테스트로 검증

### 아바타 렌더링 설계

- GitHub avatar URL을 서버 라우트에서 받아 Canvas로 렌더링
- WebAssembly 모듈은 클라이언트에서 지연 로드
- 렌더링 실패 시 기본 이미지로 폴백

### 정렬/검색 쿼리 설계

- GitHub Search Users 쿼리 문법에 맞춰 8개 조건 조합
- 정렬 옵션: 기본, followers, repositories, joined + DESC 지원
- 쿼리 빌더는 별도 유닛 테스트로 검증

### 레이트 리밋 처리

- 서버 라우트에서 403/429 감지 시 재시도(backoff)
- 남은 쿼터와 reset 시간 표시

### 테스트 전략

- Jest: 쿼리 빌더, 정렬/페이징, 데이터 매핑, SSR/CSR 경계 로직 테스트
- Cypress: 검색 플로우, 정렬 변경, 무한 스크롤, 다크 모드 전환 E2E 테스트

### MUI + Tailwind 병행 주의점(요약)

- MUI 스타일 우선순위가 Tailwind보다 높도록 설정 필요
- CSS Reset/Normalize 중복 적용 주의
- MUI Theme와 Tailwind config 컬러 팔레트 일치화 필요

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
