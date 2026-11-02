import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export default function SectionHeader({ id, eyebrow, title, desc, tone = "dark", align = "left" }: Props) {
  return (
    <header className={`${styles.header} ${tone === "light" ? styles.light : ""} ${align === "center" ? styles.center : ""}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {desc && <p className={styles.desc}>{desc}</p>}
    </header>
  );
}
