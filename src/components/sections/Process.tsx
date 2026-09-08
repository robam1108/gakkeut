const STEPS = [
  {
    n: "01",
    title: "견적 문의",
    desc: "카카오톡·전화·홈페이지 폼으로 평수와 상태를 알려주세요. 당일 내 견적을 드립니다.",
    icon: "💬",
  },
  {
    n: "02",
    title: "현장 확인",
    desc: "사진 또는 방문으로 현장을 파악합니다. 정확한 견적과 작업 시간을 안내해드립니다.",
    icon: "🔍",
  },
  {
    n: "03",
    title: "일정 예약",
    desc: "고객님 편한 날짜로 조율합니다. 당일 예약도 가능합니다 (팀 여건에 따라).",
    icon: "📅",
  },
  {
    n: "04",
    title: "전문가 방문",
    desc: "유니폼을 착용한 직영 팀이 정해진 시간에 방문합니다. 장비와 약품을 직접 세팅합니다.",
    icon: "🚐",
  },
  {
    n: "05",
    title: "청소 진행",
    desc: "구역별로 체계적으로 청소합니다. 작업 중 문의 사항은 현장 담당자에게 바로 말씀해주세요.",
    icon: "✨",
  },
  {
    n: "06",
    title: "완료 확인",
    desc: "고객님과 함께 전 구역을 확인합니다. 미흡한 부분은 즉시 재처리합니다.",
    icon: "✅",
  },
];

export default function Process() {
  return (
    <section id="process" className="section" style={{ backgroundColor: "#e0f2fe" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge badge--sky">Work Process</p>
          <h2 className="section-title">작업 과정</h2>
          <p className="section-sub section-sub--sky">처음부터 끝까지 투명하게, 예측 가능하게.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                border: "1px solid #bae6fd",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                padding: "clamp(1.125rem, 4vw, 1.5rem)",
                display: "flex",
                gap: "1rem",
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", marginBottom: "0.5rem" }} aria-hidden="true">
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    fontWeight: 900,
                    color: "#7dd3fc",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  {s.n}
                </div>
              </div>
              <div>
                <h3 style={{ color: "#0c1b3a", fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ color: "#0369a1", fontSize: "0.875rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
