import { useEffect, useRef, useState } from "react";
import { NAV } from "../content/nav";
import Logo from "./ui/Logo";
import Icon from "./ui/Icon";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴: 열려 있는 동안 배경 스크롤 잠금, ESC로 닫고 토글 버튼으로 포커스 복귀
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="GAKKEUT 깨끗 홈으로" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="주요 메뉴" className={styles.nav}>
          <ul className={styles.links}>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={styles.link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#estimate" className={`btn btn--primary ${styles.cta}`}>
            견적 신청
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.panel} ${open ? styles.panelOpen : ""}`} hidden={!open}>
        <nav aria-label="모바일 메뉴" className="container">
          <ul className={styles.panelLinks}>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={styles.panelLink} onClick={close}>
                  {n.label}
                  <Icon name="arrowRight" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <a href="#estimate" className="btn btn--primary btn--lg btn--block" onClick={close}>
            무료 견적 신청
          </a>
        </nav>
      </div>
    </header>
  );
}
