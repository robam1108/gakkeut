import { useState } from "react";
import { FAQS } from "../../content/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section" style={{ backgroundColor: "white" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.25rem" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge">FAQ</p>
          <h2 className="section-title">자주 묻는 질문</h2>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          {FAQS.map((f, i) => {
            const panelId = `faq-panel-${i}`;
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="tap"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "1rem" }}>{f.q}</span>
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
                  <div
                    id={panelId}
                    style={{
                      paddingBottom: "1.25rem",
                      color: "#475569",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {f.a}
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
