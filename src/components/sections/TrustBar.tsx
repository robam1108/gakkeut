import { TRUST_POINTS } from "../../content/principles";
import Icon from "../ui/Icon";
import styles from "./TrustBar.module.css";

export default function TrustBar() {
  return (
    <section aria-label="서비스 원칙" className={styles.bar}>
      <ul className={`container ${styles.list}`}>
        {TRUST_POINTS.map((p) => (
          <li key={p.title} className={styles.item}>
            <span className={styles.icon}>
              <Icon name={p.icon} size={22} />
            </span>
            <div>
              <p className={styles.title}>{p.title}</p>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
