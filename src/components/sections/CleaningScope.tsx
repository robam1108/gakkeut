import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const ZONES = [
  {
    title: "주방",
    emoji: "🍳",
    items: [
      "싱크대 내·외부 및 배수구",
      "가스레인지·인덕션 주변 기름때",
      "후드 필터 분해 세척",
      "냉장고·전자레인지 외부",
      "타일 줄눈 세정",
      "수납장 내·외부",
    ],
  },
  {
    title: "욕실",
    emoji: "🚿",
    items: [
      "타일·줄눈 고압 세정",
      "변기 내·외부 살균",
      "세면대·거울 수분 얼룩 제거",
      "욕조·샤워부스 스케일",
      "천장·환풍구 먼지",
      "실리콘 곰팡이 제거",
    ],
  },
  {
    title: "거실·침실",
    emoji: "🛋️",
    items: [
      "바닥 전체 물걸레·왁싱",
      "창문·창틀·방충망",
      "가구 표면 오염 제거",
      "조명·스위치 패널",
      "베란다·발코니",
      "몰딩·걸레받이",
    ],
  },
  {
    title: "기타 공간",
    emoji: "🚪",
    items: [
      "현관 바닥·신발장",
      "엘리베이터 탑승구 주변",
      "보일러실·창고",
      "에어컨 필터·루버",
      "콘센트·스위치 커버",
      "드레스룸·붙박이장 내부",
    ],
  },
];

function ItemList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "#475569",
          }}
        >
          <span style={{ color: "#3b82f6", marginTop: "0.125rem", flexShrink: 0 }} aria-hidden="true">·</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CleaningScope() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="scope" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge">Cleaning Scope</p>
          <h2 className="section-title">청소 범위</h2>
          <p className="section-sub">
            빠짐없이, 꼼꼼하게.
            <br />
            눈에 보이는 곳부터 숨겨진 곳까지 모두 청소합니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {ZONES.map((z, i) => {
            const isOpen = open === i;

            if (!isMobile) {
              return (
                <div
                  key={z.title}
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ fontSize: "1.875rem", marginBottom: "1rem" }} aria-hidden="true">{z.emoji}</div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#0c1b3a",
                      marginBottom: "1rem",
                    }}
                  >
                    {z.title}
                  </h3>
                  <ItemList items={z.items} />
                </div>
              );
            }

            // Mobile: compact accordion
            const panelId = `scope-panel-${i}`;
            return (
              <div
                key={z.title}
                style={{
                  backgroundColor: "white",
                  padding: "1.25rem",
                  border: "1px solid #e2e8f0",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="tap"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                    color: "inherit",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }} aria-hidden="true">{z.emoji}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: "#0c1b3a" }}>
                      {z.title}
                    </span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.125rem" }}>
                      {z.items.length}개 항목
                    </span>
                  </span>
                  <svg
                    fill="none"
                    stroke="#94a3b8"
                    viewBox="0 0 24 24"
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {isOpen && (
                  <div id={panelId} style={{ marginTop: "1rem" }}>
                    <ItemList items={z.items} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "#eff6ff",
            border: "1px solid #dbeafe",
            padding: "1.25rem",
            fontSize: "0.875rem",
            color: "#1a3470",
          }}
        >
          <strong>※ 안내</strong> — 청소 범위는 서비스 종류·오염 정도에 따라 달라질 수 있습니다.
          정확한 범위는 견적 상담 시 안내해드립니다.
        </div>
      </div>
    </section>
  );
}
