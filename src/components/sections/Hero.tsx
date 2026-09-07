export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        boxSizing: "border-box",
        paddingTop: "6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src="/images/hero/hero.jpg"
          alt="깔끔한 인테리어"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.75) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "42rem",
          padding: "0 1.25rem",
          marginLeft: "clamp(0.25rem, 8vw, 6rem)",
          textAlign: "left",
          color: "#0c1b3a",
        }}
      >
        <p
          style={{
            color: "#0369a1",
            fontSize: "clamp(0.8125rem, 1.25vw, 0.9375rem)",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "clamp(0.75rem, 2vw, 1rem)",
          }}
        >
          Professional Cleaning Service
        </p>
        <h1
          style={{
            fontSize: "clamp(2.25rem, 7.2vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "1.1rem",
            textShadow: "0 2px 24px rgba(255,255,255,0.5)",
          }}
        >
          한 번 맡기면,
          <br />
          <span style={{ color: "#0284c7" }}>확실히 다릅니다.</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(1.0625rem, 1.8vw, 1.3125rem)",
            color: "#334155",
            maxWidth: "36rem",
            margin: "0 0 2rem",
            lineHeight: 1.7,
          }}
        >
          10년 이상의 경력,
          <br className="br-mobile" /> 전문 청소팀이 직접 찾아갑니다.
          <br />
          입주·이사·사무실 청소 전문.
        </p>
        <div
          className="hero-cta"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
        >
          <a href="#contact-form" className="btn-primary">
            무료 견적 받기
          </a>
          <a href="#services" className="btn-outline">
            서비스 보기
          </a>
        </div>

        {/* Quick stats */}
        <div
          style={{
            marginTop: "clamp(1.5rem, 4vw, 2.5rem)",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(0.75rem, 3vw, 1.25rem)",
            borderTop: "1px solid rgba(12,27,58,0.15)",
            paddingTop: "1.25rem",
            maxWidth: "34rem",
          }}
        >
          {[
            { num: "12,000+", label: "누적 청소 건수" },
            { num: "98.7%", label: "고객 만족도" },
            { num: "10년", label: "전문 경력" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "clamp(1.5rem, 3.3vw, 1.9375rem)",
                  fontWeight: 900,
                  color: "#0c1b3a",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#475569", marginTop: "0.2rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hide-mobile"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#0369a1",
        }}
      >
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}>SCROLL</span>
        <div
          style={{
            width: "1px",
            height: "3rem",
            backgroundColor: "rgba(3,105,161,0.4)",
            animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      </div>
    </section>
  );
}
