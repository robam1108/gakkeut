// 이 프로젝트는 포트폴리오 데모입니다. 아래 연락처·통계·인증 문구는
// 전부 시연용 예시 데이터이며 실제 업체 정보가 아닙니다.
// 화면 하단(Footer)에 이 사실을 명시하는 고지를 표시합니다.
// 실제 서비스로 배포하려면 아래 값을 전부 검증된 실제 정보로 교체하세요.
export const IS_DEMO = true;

export const SITE = {
  name: "깨끗",
  phone: "010-1234-5678", // TODO(실제 값): 실제 대표 전화번호로 교체
  phoneHref: "tel:01012345678",
  hours: "평일 09:00 ~ 18:00", // TODO(실제 값)
  kakaoId: "@깨끗청소", // TODO(실제 값)
  kakaoUrl: "#contact", // TODO(실제 값): 실제 카카오톡 채널 URL로 교체
  area: "서울·경기 전역", // TODO(실제 값)
  businessNumber: "000-00-00000", // TODO(실제 값): 실제 사업자등록번호로 교체
  registrationNumber: "제0000-00000000-00호", // TODO(실제 값)
  founded: 2024,
};

// 아래 수치·인증 문구는 포트폴리오 시연을 위한 예시 카피이며 실적 근거가 없습니다.
// 실제 서비스에 게시하기 전 검증 가능한 값으로 교체하세요 (표시광고법 — 근거 없는
// 실적·인증 표시는 부당한 표시·광고에 해당할 수 있습니다).
export const STATS = {
  jobsDone: "12,000+",
  satisfaction: "98.7%",
  repeatRate: "87%",
  yearsInBusiness: "10년",
};

export const BADGES = [
  { icon: "✅", title: "청소업 정식 등록", desc: "환경부 청소업 등록 사업자" },
  { icon: "🛡️", title: "배상책임보험 가입", desc: "작업 중 파손·사고 100% 보상" },
  { icon: "🌿", title: "친환경 약품 사용", desc: "환경부 인증 세제만 사용" },
  { icon: "👥", title: "직영팀 운영", desc: "외주 없이 직접 교육된 팀만" },
];
