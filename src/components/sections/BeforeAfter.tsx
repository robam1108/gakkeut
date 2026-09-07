import { useState } from "react";

const PAIRS = [
  {
    label: "주방 입주청소",
    before: "/images/before-after/주방청소전.png",
    after: "/images/before-after/주방청소후.png",
  },
  {
    label: "욕실 이사청소",
    before: "/images/before-after/욕실청소전.png",
    after: "/images/before-after/욕실청소후.png",
  },
];

function Photo({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "#f1f5f9",
          color: "#94a3b8",
          fontSize: "0.8rem",
          lineHeight: 1.6,
        }}
      >
        이미지 없음
        <br />
        {src}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

function PhotoCard({
  src,
  alt,
  label,
  labelBg,
}: {
  src: string;
  alt: string;
  label: string;
  labelBg: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3/2",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
      }}
    >
      <Photo src={src} alt={alt} />
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          backgroundColor: labelBg,
          color: "white",
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "0.375rem 0.75rem",
          backdropFilter: "blur(4px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const pair = PAIRS[active];

  return (
    <section id="before-after" style={{ padding: "clamp(3.5rem, 10vw, 6rem) 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.25rem" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge">Before / After</p>
          <h2 className="section-title">직접 확인하세요</h2>
          <p className="section-sub">청소 전·후를 나란히 비교해보세요.</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "2rem" }}>
          {PAIRS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setActive(i)}
              className="tap"
              style={{
                padding: "0.75rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: active === i ? "#0284c7" : "#f1f5f9",
                color: active === i ? "white" : "#475569",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          style={{
            maxWidth: "64rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "1.5rem",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          }}
        >
          <PhotoCard src={pair.before} alt="청소 전" label="청소 전" labelBg="rgba(30, 41, 59, 0.8)" />
          <PhotoCard src={pair.after} alt="청소 후" label="청소 후" labelBg="rgba(2, 132, 199, 0.85)" />
        </div>
      </div>
    </section>
  );
}
