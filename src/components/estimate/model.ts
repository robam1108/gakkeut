import { SERVICES } from "../../content/services";

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

export const REGION_OPTIONS = ["서울", "경기", "인천", "그 외 지역"];

export const EXTRA_OPTIONS = [
  "베란다",
  "창틀·새시",
  "냉장고 내부",
  "붙박이장 내부",
  "곰팡이 집중 제거",
  "스티커·보호필름 제거",
];

export type EstimateData = {
  // STEP 1
  serviceType: string;
  size: string;
  region: string;
  regionDetail: string;
  date: string;
  dateFlexible: boolean;
  extras: string[];
  extraNote: string;
  // STEP 2
  name: string;
  phone: string;
  address: string;
  message: string;
  // STEP 3
  consent: boolean;
};

export type FieldKey = keyof EstimateData;
export type Errors = Partial<Record<FieldKey, string>>;

export const INITIAL_DATA: EstimateData = {
  serviceType: "",
  size: "",
  region: "",
  regionDetail: "",
  date: "",
  dateFlexible: false,
  extras: [],
  extraNote: "",
  name: "",
  phone: "",
  address: "",
  message: "",
  consent: false,
};

export const STEPS = [
  { title: "청소 정보", fields: ["serviceType", "size", "region", "regionDetail", "date"] },
  { title: "고객 정보", fields: ["name", "phone", "address"] },
  { title: "최종 확인", fields: ["consent"] },
] as const satisfies { title: string; fields: FieldKey[] }[];

export const fieldId = (k: FieldKey) => `est-${k}`;
export const errorId = (k: FieldKey) => `est-${k}-error`;

// 입력 요소에 붙이는 공통 aria 속성 (오류 > 힌트 순으로 describedby 연결)
export function a11yProps(name: FieldKey, error?: string, hint?: boolean, required?: boolean) {
  const describedBy = error ? errorId(name) : hint ? `${fieldId(name)}-hint` : undefined;
  return {
    id: fieldId(name),
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": required || undefined,
  };
}

// 로컬 시간 기준 오늘 (toISOString은 UTC라 새벽 시간대에 하루 어긋남)
export const todayLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
