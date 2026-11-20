# GAKKEUT 깨끗 — 청소업체 홈페이지 리뉴얼

> 입주·이사·거주·주방/욕실·상업 공간 청소 업체를 위한 **전환(견적 신청) 중심 원페이지 홈페이지**

**🔗 Live Demo — [gakkeut-renewal.vercel.app](https://gakkeut-renewal.vercel.app)**

<br />

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 유형 | 소상공인(청소업체) 랜딩 페이지 리뉴얼 · 개인 포트폴리오 |
| 기간 | 2026.09 ~ 2026.11 |
| 참여 | 1인 — 기획(정보 구조), UI 디자인, 프론트엔드 개발, 배포 |
| 스택 | React 19 · TypeScript · Vite · CSS Modules · Formspree · Vercel |

기존에 만들어 두었던 청소업체 랜딩 페이지를 **"실제 고객에게 납품할 수 있는 수준"** 을 목표로 다시 만들었습니다.
보기 좋은 화면보다 **방문자가 신뢰를 갖고 견적을 신청하게 만드는 흐름**과, **사업자가 그대로 운영할 수 있는 완성도**에 초점을 맞췄습니다.

### 리뉴얼 포인트

- **브랜드 재정립** — 포레스트 그린 · 아이보리 기반 컬러 시스템과 디자인 토큰으로 차분하고 신뢰감 있는 톤 구축
- **정보 구조 재설계** — `Hero → 신뢰 요소 → 서비스 → 전후 비교 → 차별점 → 진행 과정 → 견적 산정 기준 → FAQ → 견적 신청` 순으로, 방문자의 의문을 하나씩 해소한 뒤 신청으로 이어지도록 배치
- **단계형 견적 폼** — 한 화면에 긴 폼 대신 3단계(청소 정보 → 고객 정보 → 최종 확인)로 나눠 이탈 감소
- **실제 이메일 접수** — Formspree 연동으로 서버 없이 견적 신청을 사업자 메일로 수신

<br />

## 주요 기능

### 1. 3단계 견적 신청 폼
- 단계별 유효성 검사, 오류 요약 + 첫 오류 필드로 포커스 이동
- 전화번호 **자동 하이픈**(휴대폰 · 02 · 지역번호 · 070 대응) 및 형식 검증
- 서비스 카드의 "○○ 견적 받기" 클릭 시 **청소 종류가 미리 선택된 상태**로 폼 이동 (CustomEvent)
- 마지막 단계에서 입력 내용 요약 확인 및 해당 단계로 바로 돌아가 수정
- **sessionStorage 임시 저장** — 새로고침해도 입력 내용 유지 (개인정보 동의 체크는 의도적으로 저장하지 않음)

### 2. 안정적인 전송 처리
| 상황 | 동작 |
|---|---|
| 전송 키 미설정 | **테스트 모드** — 실제 전송 없이 결과 화면 확인, payload는 콘솔 출력. "접수 완료"로 오인하지 않도록 별도 화면 표시 |
| 정상 | HTTP 상태 **그리고** 응답 본문 `ok: true` 일 때만 접수 완료 처리 |
| 실패 / 10초 타임아웃 | 원인별 안내(네트워크·지연·서버), **입력 내용 유지**, 재시도 및 전화·카카오 대체 연락 수단 제공 |

- 스팸 방지: 허니팟 필드 + 페이지 열람 후 3초 이내 제출 차단
- 중복 제출 방지: `ref` 기반 잠금 (state 업데이트 지연으로 인한 연타 문제 회피)

### 3. Before / After 비교 슬라이더
- 포인터 이벤트(`setPointerCapture`)로 마우스·터치 드래그를 하나의 코드로 처리
- 숨겨진 `input[type=range]`를 겹쳐 **키보드·스크린리더로도 조작 가능**

### 4. 모바일 하단 고정 CTA
- `IntersectionObserver`로 히어로를 지나면 노출, 견적 섹션이 보이는 동안에는 자동 숨김
- 숨김 상태에서는 `inert` 처리해 포커스가 들어가지 않도록 함

<br />

## 기술적으로 신경 쓴 부분

### 접근성 (a11y)
- 모든 입력 요소에 `aria-invalid` / `aria-describedby`(오류 > 힌트 순) / `aria-required` 를 공통 함수로 일관 적용
- 진행률 표시줄 `role="progressbar"` + `aria-valuetext` ("3단계 중 2단계: 고객 정보")
- 단계 전환 시 단계 제목으로 포커스 이동, 고정 헤더에 가려지지 않도록 스크롤 보정
- 결과 화면은 `role="status"` / `role="alert"` 로 스크린리더에 즉시 안내
- 작은 글씨용 보조 색상을 따로 두어 아이보리 배경 위 명도 대비 확보, `prefers-reduced-motion` 대응

### 검색 노출 (SEO)
- 메타 / Open Graph / Twitter Card, `sitemap.xml`, `robots.txt`, Web Manifest
- **JSON-LD 구조화 데이터**: FAQPage는 항상 출력, LocalBusiness는 **실제 사업자 정보가 입력된 경우에만** 출력해 검증되지 않은 정보가 검색엔진에 노출되지 않도록 설계

### 성능
- 런타임 의존성은 `react`, `react-dom` 뿐 — UI 라이브러리 없이 직접 구현
- 이미지 전부 WebP 변환, 명시적 `width/height`로 레이아웃 이동(CLS) 방지, 첫 화면 외 이미지 `loading="lazy"`
- 히어로 이미지 `preload` + `fetchpriority="high"`, 폰트는 Pretendard **dynamic subset**으로 필요한 글리프만 로드

### 운영을 고려한 설계
- 사업자 정보(상호·전화·사업자번호·카카오 채널 등)를 `src/config/site.ts` **한 곳에서 관리**
- 값이 비어 있으면 `[대표 전화번호]` 같은 플레이스홀더를 표시하고, 전화·카카오 버튼은 **자동으로 숨김** — 값만 채우면 버튼과 구조화 데이터가 활성화
- 서비스·FAQ·진행 과정 등 문구는 `src/content/` 데이터로 분리해 코드 수정 없이 내용 변경 가능
- 날짜 검증은 로컬 시간 기준(`toISOString()`의 UTC 기준 때문에 새벽에 날짜가 하루 어긋나는 문제 해결)

<br />

## 기술 스택

| 분류 | 사용 기술 |
|---|---|
| Framework | React 19, TypeScript |
| Build | Vite |
| Styling | CSS Modules + CSS Custom Properties(디자인 토큰) |
| Form | Formspree (서버리스 폼 전송) |
| Lint | oxlint |
| Deploy | Vercel (GitHub 연동 자동 배포) |
| Font | Pretendard Variable |

<br />

## 프로젝트 구조

```
src/
├── config/site.ts           # 사업자·연락처 정보 (빈 값이면 플레이스홀더 + 버튼 비활성)
├── content/                 # 서비스·원칙·FAQ·내비게이션 데이터
├── styles/tokens.css        # 디자인 토큰 (컬러·라운드·그림자·타이포)
├── index.css                # 공통 클래스 (버튼·컨테이너·섹션)
└── components/
    ├── Header / Footer / MobileCTABar / StructuredData
    ├── sections/            # Hero, TrustBar, Services, BeforeAfter, WhyGakkeut,
    │                        # Process, PricingGuide, FAQ
    ├── estimate/            # 견적 폼
    │   ├── EstimateForm.tsx #   상태·단계 전환·제출 흐름
    │   ├── Step*.tsx        #   단계별 화면
    │   ├── model.ts         #   타입·초기값·단계 정의·a11y 헬퍼
    │   ├── validation.ts    #   검증·전화번호 포맷
    │   └── submit.ts        #   Formspree 전송·타임아웃·테스트 모드
    └── ui/                  # Logo, Icon(인라인 SVG), SectionHeader
```

<br />

## 실행 방법

```bash
npm install
npm run dev       # 개발 서버
npm run build     # 타입 체크 + 프로덕션 빌드
npm run lint      # oxlint
```

견적 폼을 실제로 전송하려면 `.env.example`을 `.env`로 복사하고 Formspree 엔드포인트를 입력합니다.
(설정하지 않으면 테스트 모드로 동작합니다.)

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

배포 환경에서는 Vercel 프로젝트의 환경 변수에 같은 값을 설정합니다.

<br />

## 실제 납품 시 체크리스트

포트폴리오 버전에는 실제 사업자 정보가 없으므로, 납품 시 아래 항목만 채우면 바로 운영할 수 있습니다.

- [ ] `src/config/site.ts` — 상호, 대표자, 사업자등록번호, 전화, 카카오톡 채널 등
- [ ] 개인정보 처리방침 · 이용약관 페이지 URL 연결
- [ ] `public/images/before-after/` 를 실제 시공 전후 사진으로 교체 후 "예시 이미지" 고지 문구 조정
- [ ] `index.html` 의 canonical / og:url 을 실제 도메인으로 변경

<br />

## 이미지 출처

서비스·히어로 이미지는 Unsplash License 이미지를 사용했으며, 전후 비교 이미지는 **예시 이미지**로 화면에도 고지되어 있습니다.
자세한 출처는 [`public/images/CREDITS.md`](public/images/CREDITS.md)를 참고하세요.
