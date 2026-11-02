export type Service = {
  id: string;
  title: string;
  summary: string;
  desc: string;
  scope: string[];
  image: { src: string; alt: string; width: number; height: number };
};

export const SERVICES: Service[] = [
  {
    id: "move-in",
    title: "입주 청소",
    summary: "새 공간에서의 첫날을 위한 청소",
    desc: "시공 후 남은 분진과 자재 잔여물, 스티커와 보호필름 자국을 제거합니다. 생활을 시작하기 전에 손이 닿기 어려운 곳까지 정리합니다.",
    scope: ["공사 분진·잔여물 제거", "창호·창틀·방충망", "주방 수납장 내부", "욕실 타일·줄눈", "바닥 및 걸레받이"],
    image: { src: "/images/services/move-in.webp", alt: "가구가 없는 밝은 방과 유리문", width: 1000, height: 1000 },
  },
  {
    id: "moving",
    title: "이사 청소",
    summary: "나가는 집과 들어가는 집 모두",
    desc: "가구를 들어낸 자리에 쌓인 먼지와 생활 오염을 정리합니다. 이사 일정에 맞춰 작업 시간을 조율합니다.",
    scope: ["가구 자리 먼지·오염", "주방 기름때", "욕실 물때·곰팡이", "베란다·다용도실", "붙박이장 내부"],
    image: { src: "/images/services/moving.webp", alt: "이사 상자가 쌓인 빈 방", width: 1000, height: 1000 },
  },
  {
    id: "living",
    title: "거주 청소",
    summary: "지금 살고 있는 공간을 그대로",
    desc: "생활 중인 공간을 정리된 상태로 되돌립니다. 가구와 물품의 위치를 유지하면서 필요한 구역을 중심으로 작업합니다.",
    scope: ["생활 먼지 제거", "주방 상판·후드 표면", "욕실 전체", "가구 표면 닦기", "바닥 청소"],
    image: { src: "/images/services/living.webp", alt: "햇빛이 드는 정돈된 거실", width: 1000, height: 1000 },
  },
  {
    id: "kitchen-bath",
    title: "주방·욕실 집중 청소",
    summary: "오염이 가장 많이 쌓이는 곳만",
    desc: "기름때와 물때, 곰팡이처럼 일반 청소로 잘 지워지지 않는 오염을 재질에 맞는 방법으로 집중 관리합니다.",
    scope: ["후드·가스레인지 기름때", "싱크대·배수구", "타일 줄눈 곰팡이", "수전·거울 물때", "변기·욕조·샤워부스"],
    image: { src: "/images/services/kitchen-bath.webp", alt: "창가의 깨끗한 흰색 주방 싱크대", width: 1000, height: 1000 },
  },
  {
    id: "commercial",
    title: "상업 공간 청소",
    summary: "사무실, 매장, 오픈 전 공간",
    desc: "영업 일정에 지장이 없도록 시간대를 협의해 진행합니다. 오픈 전 준공 청소부터 정기 관리까지 공간 용도에 맞춰 범위를 정합니다.",
    scope: ["바닥·카펫", "유리·파티션", "탕비실·화장실", "출입구·공용부", "오픈 전 준공 청소"],
    image: { src: "/images/services/commercial.webp", alt: "책상이 정돈된 밝은 사무 공간", width: 1000, height: 1000 },
  },
];
