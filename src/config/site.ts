// 사업자·연락처 정보. 확인되지 않은 정보는 임의로 만들지 않고 빈 값("")으로 둔다.
// 빈 값이면 화면에는 [대괄호] 플레이스홀더가 표시되고, 전화·카카오 링크는 비활성 처리된다.
// 실제 운영 시 아래 TODO 값을 전부 검증된 정보로 채우세요.
export const SITE = {
  brand: "GAKKEUT",
  brandKo: "깨끗",
  companyName: "", // TODO(실제 값): 상호
  ceo: "", // TODO(실제 값): 대표자명
  businessNumber: "", // TODO(실제 값): 사업자등록번호
  address: "", // TODO(실제 값): 사업장 주소
  phone: "", // TODO(실제 값): 예) 010-0000-0000
  email: "", // TODO(실제 값)
  hours: "", // TODO(실제 값): 예) 평일 09:00 ~ 18:00
  kakaoUrl: "", // TODO(실제 값): 카카오톡 채널 URL (https://pf.kakao.com/...)
  serviceArea: "", // TODO(실제 값): 예) 서울·경기
  privacyUrl: "#", // TODO(실제 값): 개인정보 처리방침 페이지
  termsUrl: "#", // TODO(실제 값): 이용약관 페이지
};

export const PLACEHOLDER = {
  companyName: "[상호명]",
  ceo: "[대표자명]",
  businessNumber: "[사업자등록번호]",
  address: "[사업장 주소]",
  phone: "[대표 전화번호]",
  email: "[이메일]",
  hours: "[영업시간]",
  serviceArea: "[서비스 지역]",
} satisfies Partial<Record<keyof typeof SITE, string>>;

export type SiteKey = keyof typeof PLACEHOLDER;

export const siteValue = (key: SiteKey) => SITE[key] || PLACEHOLDER[key];

export const phoneHref = SITE.phone ? `tel:${SITE.phone.replace(/[^\d+]/g, "")}` : undefined;
export const kakaoHref = SITE.kakaoUrl || undefined;
