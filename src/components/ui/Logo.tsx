import styles from "./Logo.module.css";

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`${styles.logo} ${tone === "light" ? styles.light : ""}`}>
      <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="7" fill="currentColor" />
        <path d="M9 16.5l4.5 4.5L23 11.5" fill="none" stroke="var(--c-accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={styles.word}>GAKKEUT</span>
      <span className="sr-only">깨끗</span>
    </span>
  );
}
