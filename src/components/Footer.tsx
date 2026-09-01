export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "white",
                marginBottom: "0.75rem",
              }}
            >
              깨끗<span style={{ color: "#3b82f6" }}>.</span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
              한 번 맡기면, 확실히 다릅니다.
              <br />
              전문 청소 서비스로 새로운 시작을.
            </p>
          </div>
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.875rem" }}>
              서비스
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["입주청소", "이사청소", "거주청소", "사무실청소", "에어컨청소", "특수청소"].map((s) => (
                <li key={s} style={{ fontSize: "0.875rem" }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.875rem" }}>
              연락처
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li style={{ fontSize: "0.875rem" }}>📞 010-1234-5678</li>
              <li style={{ fontSize: "0.875rem" }}>💬 카카오톡: @깨끗청소</li>
              <li style={{ fontSize: "0.875rem" }}>📍 서울·경기 전역</li>
              <li style={{ fontSize: "0.875rem" }}>🕐 평일 09:00 ~ 18:00</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
          }}
        >
          <span>© 2024 깨끗 청소 서비스. All rights reserved.</span>
          <span>청소업 등록번호: 제2024-서울강남-00000호</span>
        </div>
      </div>
    </footer>
  );
}
