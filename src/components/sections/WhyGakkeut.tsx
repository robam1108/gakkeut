import { WHY_POINTS } from "../../content/principles";
import SectionHeader from "../ui/SectionHeader";
import styles from "./WhyGakkeut.module.css";

export default function WhyGakkeut() {
  return (
    <section id="why" className="section" aria-labelledby="why-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <SectionHeader
            id="why-title"
            eyebrow="Why GAKKEUT"
            title={
              <>
                깨끗함은
                <br />
                과정에서 결정됩니다
              </>
            }
            desc="빠르게 끝내는 것보다 정확하게 끝내는 것을 우선합니다. GAKKEUT이 모든 현장에서 지키는 네 가지 작업 원칙입니다."
          />
        </div>

        <ol className={styles.list}>
          {WHY_POINTS.map((p, i) => (
            <li key={p.title} className={styles.item}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
