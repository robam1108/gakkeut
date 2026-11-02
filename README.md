# GAKKEUT 깨끗 — 전문 청소 서비스 홈페이지

입주·이사·거주·주방/욕실 집중·상업 공간 청소 업체를 위한 원페이지 홈페이지입니다.
`gakkeut` 랜딩 페이지를 클론해 브랜드(포레스트 그린 · 아이보리), 정보 구조, 단계형 견적 신청 폼까지 리뉴얼했습니다.

## 스택

- React 19 + TypeScript + Vite (추가 라이브러리 없음)
- CSS Modules — 디자인 토큰은 `src/styles/tokens.css`, 공통 클래스(버튼·컨테이너)는 `src/index.css`
- 폰트: Pretendard Variable (jsDelivr dynamic subset)

## 개발

```bash
npm install
npm run dev       # 개발 서버
npm run build     # 타입 체크 + 프로덕션 빌드
npm run lint      # oxlint
```

## 견적 폼 전송 (Formspree)

`.env.example` 을 `.env` 로 복사하고 `VITE_FORMSPREE_ENDPOINT` 를 채우세요. 배포 환경은 Vercel 프로젝트 환경 변수에 설정합니다.

| 상태 | 동작 |
|---|---|
| 엔드포인트 없음 | **테스트 모드** — 전송하지 않고 "실제로 전송되지 않았습니다" 화면 표시, payload는 콘솔 출력 |
| 엔드포인트 있음 | Formspree 엔드포인트로 POST. HTTP 성공 **그리고** `ok: true` 일 때만 접수 완료 화면 |
| 실패/타임아웃(10초) | 실패 화면, 입력 내용 유지, 다시 시도 |

스팸 방지: 허니팟(`botcheck` → Formspree `_gotcha`) + 열람 후 3초 이내 제출 차단. 중복 제출은 ref 잠금으로 막습니다.
입력 중인 내용은 sessionStorage에 보관되어 새로고침해도 유지됩니다(개인정보 동의 체크는 저장하지 않음).

## 구조

```
src/
  config/site.ts            사업자·연락처 정보 (빈 값이면 [플레이스홀더] 표시)
  content/                  서비스·원칙·프로세스·FAQ·내비 데이터
  components/
    Header, Footer, MobileCTABar, StructuredData
    sections/               Hero, TrustBar, Services, BeforeAfter, WhyGakkeut, Process, PricingGuide, FAQ
    estimate/               EstimateForm + Step* / Field / model / validation / submit
    ui/                     Logo, Icon, SectionHeader
```

## 실제 운영 전 체크리스트

- [ ] `src/config/site.ts` 의 TODO 값(상호, 사업자등록번호, 전화, 카카오톡 채널 등) 입력 — 값을 채우면 전화/카카오 버튼과 LocalBusiness 구조화 데이터가 자동 활성화됩니다
- [ ] 개인정보 처리방침·이용약관 페이지 URL 연결
- [ ] `public/images/before-after/` 를 실제 시공 전후 사진(같은 공간·같은 구도)으로 교체 후 "예시 이미지" 고지 문구 조정
- [ ] `index.html` canonical / og:url 을 실제 도메인으로 변경
- [ ] 이미지 출처는 `public/images/CREDITS.md` 참고
