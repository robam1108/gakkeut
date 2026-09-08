import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const SERVICES = [
  {
    emoji: "🏠",
    title: "입주청소",
    desc: "새집 입주 전, 공사 잔여물과 먼지를 완벽하게 제거합니다. 건설사 마감 품질 그 이상으로.",
    items: ["바닥 줄눈 세정", "창호 전체", "주방·욕실 오염 제거", "에어컨 필터"],
    price: "25평 기준 19만원~",
    highlight: true,
  },
  {
    emoji: "📦",
    title: "이사청소",
    desc: "이사 나가는 집, 들어오는 집 모두 맡깁니다. 보증금 반환에 유리한 상태로.",
    items: ["전 구역 청소", "실리콘 곰팡이", "냉장고·세탁기 내부", "베란다"],
    price: "25평 기준 22만원~",
    highlight: false,
  },
  {
    emoji: "🧹",
    title: "거주청소",
    desc: "살면서 쌓이는 먼지와 오염, 정기적으로 전문가에게 맡기세요.",
    items: ["전체 바닥 청소", "주방·욕실", "가구 표면", "에어컨 필터"],
    price: "25평 기준 8만원~",
    highlight: false,
  },
  {
    emoji: "🏢",
    title: "사무실청소",
    desc: "업무 공간을 항상 청결하게. 야간·주말 작업으로 업무 방해 없이.",
    items: ["바닥 왁싱", "유리·파티션", "탕비실 청소", "카펫 흡입"],
    price: "면적 및 주기 협의",
    highlight: false,
  },
  {
    emoji: "❄️",
    title: "에어컨청소",
    desc: "냄새·세균의 원인인 에어컨 내부를 분해 세척합니다.",
    items: ["필터 세척", "열교환기 고압세척", "팬 분해 세척", "항균 처리"],
    price: "스탠드 1대 3만원~",
    highlight: false,
  },
  {
    emoji: "⚗️",
    title: "특수청소",
    desc: "일반 청소로 해결 안 되는 심한 오염, 곰팡이, 악취 제거.",
    items: ["곰팡이 제거", "악취 탈취", "기름때 제거", "바닥재 코팅"],
    price: "현장 견적 필요",
    highlight: false,
  },
];

function ItemList({ items, highlight, compact }: { items: string[]; highlight: boolean; compact?: boolean }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: compact ? 0 : "0 0 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
        flexGrow: compact ? 0 : 1,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: highlight ? "#dbeafe" : "#475569",
          }}
        >
          <span style={{ color: highlight ? "#3b82f6" : "#2563eb" }} aria-hidden="true">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge">Services</p>
          <h2 className="section-title">전문 청소 서비스</h2>
          <p className="section-sub">
            모든 서비스는 직영팀이 직접 진행합니다.
            <br />
            외주·하청 없이, 교육된 전문가가 책임집니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            const cardStyle = {
              display: "flex",
              flexDirection: "column" as const,
              padding: "2rem",
              border: `1px solid ${s.highlight ? "#1a3470" : "#e2e8f0"}`,
              backgroundColor: s.highlight ? "#0f2356" : "white",
              color: s.highlight ? "white" : "#1e293b",
            };

            if (!isMobile) {
              return (
                <div key={s.title} style={cardStyle}>
                  <span style={{ fontSize: "2.5rem", marginBottom: "1rem" }} aria-hidden="true">{s.emoji}</span>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: s.highlight ? "white" : "#0c1b3a",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                      color: s.highlight ? "#93c5fd" : "#64748b",
                      flexGrow: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                  <ItemList items={s.items} highlight={s.highlight} />
                  <div
                    style={{
                      paddingTop: "1rem",
                      borderTop: `1px solid ${s.highlight ? "#1a3470" : "#f1f5f9"}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: s.highlight ? "#93c5fd" : "#1e4080",
                      }}
                    >
                      {s.price}
                    </span>
                  </div>
                </div>
              );
            }

            // Mobile: compact accordion
            const panelId = `service-panel-${i}`;
            return (
              <div key={s.title} style={{ ...cardStyle, padding: "1.25rem" }}>
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
                  <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{s.emoji}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "1.0625rem",
                        fontWeight: 700,
                        color: s.highlight ? "white" : "#0c1b3a",
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        marginTop: "0.125rem",
                        color: s.highlight ? "#93c5fd" : "#1e4080",
                      }}
                    >
                      {s.price}
                    </span>
                  </span>
                  <svg
                    fill="none"
                    stroke={s.highlight ? "#93c5fd" : "#94a3b8"}
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
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        marginBottom: "1rem",
                        color: s.highlight ? "#93c5fd" : "#64748b",
                      }}
                    >
                      {s.desc}
                    </p>
                    <ItemList items={s.items} highlight={s.highlight} compact />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
