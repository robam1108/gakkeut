// TODO: 실제 카카오톡 채널 URL로 교체
const KAKAO_URL = "#contact";

export default function MobileCTABar() {
  return (
    <div
      className="only-mobile mobile-cta-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "flex",
        backgroundColor: "white",
        borderTop: "1px solid #e2e8f0",
        boxShadow: "0 -1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <a
        href="tel:01012345678"
        className="tap"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.125rem",
          minHeight: "3.5rem",
          backgroundColor: "white",
          color: "#0c1b3a",
          fontSize: "0.75rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "1.125rem" }}>📞</span>
        전화
      </a>
      <a
        href={KAKAO_URL}
        className="tap"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.125rem",
          minHeight: "3.5rem",
          backgroundColor: "white",
          color: "#0c1b3a",
          fontSize: "0.75rem",
          fontWeight: 600,
          textDecoration: "none",
          borderLeft: "1px solid #e2e8f0",
        }}
      >
        <span style={{ fontSize: "1.125rem" }}>💬</span>
        카톡
      </a>
      <a
        href="#contact"
        className="tap"
        style={{
          flex: 1.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "3.5rem",
          backgroundColor: "#0284c7",
          color: "white",
          fontSize: "0.875rem",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        무료 견적
      </a>

      <style>{`
        @media (min-width: 768px) {
          .mobile-cta-bar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
