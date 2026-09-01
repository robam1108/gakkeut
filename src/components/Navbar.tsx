import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "서비스", href: "#services" },
  { label: "비포/애프터", href: "#before-after" },
  { label: "작업 과정", href: "#process" },
  { label: "자주 묻는 질문", href: "#faq" },
  { label: "견적 문의", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        backgroundColor: scrolled ? "white" : "transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            color: "#0c1b3a",
            textDecoration: "none",
          }}
        >
          깨끗<span style={{ color: "#3b82f6" }}>.</span>
        </a>

        {/* Desktop */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="desktop-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s",
            backgroundColor: "#0284c7",
            color: "white",
          }}
        >
          무료 견적
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "#1e293b",
          }}
          aria-label="메뉴"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "1.5rem", height: "1.5rem" }}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: "white",
            borderTop: "1px solid #f1f5f9",
            boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
          }}
          className="mobile-menu"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "1rem 1.5rem",
                color: "#334155",
                fontWeight: 500,
                borderBottom: "1px solid #f8fafc",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ padding: "1rem" }}>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "0.75rem",
                backgroundColor: "#0f2356",
                color: "white",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              무료 견적 받기
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
}
