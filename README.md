# 깨끗 — 전문 청소 서비스

입주·이사·사무실 청소 업체를 위한 원페이지 랜딩 페이지입니다.

## 스택

- React 19 + TypeScript
- Vite
- 순수 CSS — 전역 스타일은 `src/index.css`, 컴포넌트별 스타일은 대부분 인라인 `style` 객체로 작성되어 있습니다. Tailwind 등 별도 CSS 프레임워크는 사용하지 않습니다.

## 개발

```bash
npm install
npm run dev       # 개발 서버 실행
npm run build     # 타입 체크 + 프로덕션 빌드
npm run lint       # oxlint 실행
npm run preview   # 빌드 결과 미리보기
```

## 구조

- `src/components/sections/` — Hero, Services, BeforeAfter, CleaningScope, Process, FAQ, Contact 등 섹션별 컴포넌트
- `src/components/` — Navbar, Footer, MobileCTABar 등 공통 컴포넌트
- `src/hooks/useIsMobile.ts` — 반응형 분기(767px 기준)에 사용하는 훅
- `src/index.css` — 색상 토큰(`:root`), 공통 클래스(`.btn-primary`, `.badge`, `.section-title` 등), 모바일 미디어쿼리
