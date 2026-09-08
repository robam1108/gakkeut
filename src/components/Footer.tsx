import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
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
              {SITE.name}
              <span style={{ color: "#3b82f6" }}>.</span>
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
              <li style={{ fontSize: "0.875rem" }}><span aria-hidden="true">📞</span> {SITE.phone}</li>
              <li style={{ fontSize: "0.875rem" }}><span aria-hidden="true">💬</span> 카카오톡: {SITE.kakaoId}</li>
              <li style={{ fontSize: "0.875rem" }}><span aria-hidden="true">📍</span> {SITE.area}</li>
              <li style={{ fontSize: "0.875rem" }}><span aria-hidden="true">🕐</span> {SITE.hours}</li>
            </ul>
          </div>
        </div>

        {/* 포트폴리오 고지 — 이 페이지는 실제 청소업체가 아닌 시연용 데모입니다. */}
        <div
          style={{
            border: "1px solid #334155",
            backgroundColor: "rgba(51, 65, 85, 0.3)",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            color: "#cbd5e1",
          }}
          role="note"
        >
          <strong style={{ color: "white" }}>⚠ 포트폴리오 안내</strong> — 이 페이지는 실제 운영 중인 업체가
          아닌 프론트엔드 개발 포트폴리오용 데모입니다. 위에 표시된 상호·연락처·사업자등록번호·이용 실적·인증
          문구는 전부 시연을 위한 예시이며, 실제 사실이 아닙니다. 실제 문의나 결제로 이어지지 않습니다.
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
          <span>© {SITE.founded}–{new Date().getFullYear()} {SITE.name} 청소 서비스 (데모). All rights reserved.</span>
          <span>청소업 등록번호(예시): {SITE.registrationNumber}</span>
        </div>
      </div>
    </footer>
  );
}
