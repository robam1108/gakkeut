import { STATS, BADGES } from "../../config/site";

const TRUST_STATS = [
  { icon: "🏆", num: STATS.jobsDone, label: "누적 청소 건수" },
  { icon: "⭐", num: STATS.satisfaction, label: "고객 만족도" },
  { icon: "🔄", num: STATS.repeatRate, label: "재이용률" },
  { icon: "📅", num: STATS.yearsInBusiness, label: "업력" },
];

export default function Trust() {
  return (
    <section style={{ backgroundColor: "#e0f2fe", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
      <div className="container">
        {/* Stats */}
        <div
          className="hide-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            gap: "2rem",
            marginBottom: "clamp(2.5rem, 8vw, 5rem)",
          }}
        >
          {TRUST_STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.875rem", marginBottom: "0.75rem" }} aria-hidden="true">{s.icon}</div>
              <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#0c1b3a" }}>
                {s.num}
              </div>
              <div style={{ color: "#0369a1", fontSize: "0.875rem", marginTop: "0.5rem", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="hide-mobile"
          style={{
            width: "5rem",
            height: "1px",
            backgroundColor: "#bae6fd",
            margin: "0 auto clamp(2.5rem, 8vw, 5rem)",
          }}
        />

        {/* Trust badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "1rem",
          }}
        >
          {BADGES.map((b) => (
            <div
              key={b.title}
              style={{
                border: "1px solid #bae6fd",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                padding: "clamp(1.125rem, 4vw, 1.5rem)",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.5rem", marginTop: "0.125rem" }} aria-hidden="true">{b.icon}</span>
              <div>
                <div style={{ color: "#0c1b3a", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                  {b.title}
                </div>
                <div style={{ color: "#0284c7", fontSize: "0.75rem", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
