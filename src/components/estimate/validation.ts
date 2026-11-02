import { STEPS, todayLocal, type EstimateData, type Errors } from "./model";

// 010-1234-5678 / 02-123-4567 / 031-123-4567 / 070-1234-5678 형태로 자동 하이픈
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "");
  if (d.startsWith("02")) {
    const n = d.slice(0, 10);
    if (n.length <= 2) return n;
    if (n.length <= 5) return `${n.slice(0, 2)}-${n.slice(2)}`;
    if (n.length <= 9) return `${n.slice(0, 2)}-${n.slice(2, 5)}-${n.slice(5)}`;
    return `${n.slice(0, 2)}-${n.slice(2, 6)}-${n.slice(6)}`;
  }
  const n = d.slice(0, 11);
  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}-${n.slice(3)}`;
  if (n.length <= 10) return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}`;
}

export function isValidPhone(value: string) {
  const d = value.replace(/\D/g, "");
  return /^01[016789]\d{7,8}$/.test(d) || /^02\d{7,8}$/.test(d) || /^0[3-7]\d\d{7,8}$/.test(d);
}

function validateAll(data: EstimateData): Errors {
  const e: Errors = {};

  if (!data.serviceType) e.serviceType = "청소 종류를 선택해주세요.";

  const size = Number(data.size);
  if (!data.size.trim()) e.size = "공간 면적을 입력해주세요.";
  else if (!Number.isFinite(size) || size <= 0 || size > 2000) e.size = "면적은 1~2000 사이 숫자(평)로 입력해주세요.";

  if (!data.region) e.region = "작업 지역을 선택해주세요.";
  if (!data.regionDetail.trim()) e.regionDetail = "시·구·동을 입력해주세요.";

  if (!data.dateFlexible) {
    if (!data.date) e.date = "희망 일정을 선택하거나 '일정 협의'를 체크해주세요.";
    else if (data.date < todayLocal()) e.date = "오늘 이후 날짜를 선택해주세요.";
  }

  const name = data.name.trim();
  if (!name) e.name = "이름을 입력해주세요.";
  else if (name.length > 30) e.name = "이름은 30자 이내로 입력해주세요.";

  if (!data.phone.trim()) e.phone = "연락처를 입력해주세요.";
  else if (!isValidPhone(data.phone)) e.phone = "연락처 형식을 확인해주세요. 예) 010-1234-5678";

  if (!data.address.trim()) e.address = "청소할 곳의 상세 주소를 입력해주세요.";

  if (!data.consent) e.consent = "개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.";

  return e;
}

export function validateStep(step: number, data: EstimateData): Errors {
  const all = validateAll(data);
  const out: Errors = {};
  for (const k of STEPS[step].fields) if (all[k]) out[k] = all[k];
  return out;
}
