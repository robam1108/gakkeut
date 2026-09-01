const STATS = [
  { icon: "🏆", num: "12,000+", label: "누적 청소 건수" },
  { icon: "⭐", num: "98.7%", label: "고객 만족도" },
  { icon: "🔄", num: "87%", label: "재이용률" },
  { icon: "📅", num: "10년", label: "업력" },
];

const BADGES = [
  { icon: "✅", title: "청소업 정식 등록", desc: "환경부 청소업 등록 사업자" },
  { icon: "🛡️", title: "배상책임보험 가입", desc: "작업 중 파손·사고 100% 보상" },
  { icon: "🌿", title: "친환경 약품 사용", desc: "환경부 인증 세제만 사용" },
  { icon: "👥", title: "직영팀 운영", desc: "외주 없이 직접 교육된 팀만" },
];

export default function Trust() {
  return (
    <section style={{ backgroundColor: "#e0f2fe", padding: "clamp(3rem, 8vw, 5rem) 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.25rem" }}>
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            gap: "2rem",
            marginBottom: "clamp(2.5rem, 8vw, 5rem)",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.875rem", marginBottom: "0.75rem" }}>{s.icon}</div>
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
                padding: "1.5rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.5rem", marginTop: "0.125rem" }}>{b.icon}</span>
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
