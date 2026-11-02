import { PROCESS_STEPS } from "../../content/principles";
import SectionHeader from "../ui/SectionHeader";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section id="process" className="section section--dark" aria-labelledby="process-title">
      <div className="container">
        <SectionHeader
          id="process-title"
          tone="light"
          eyebrow="Process"
          title="신청부터 완료까지, 다섯 단계"
          desc="모든 작업은 범위를 먼저 확인하고 시작합니다. 단계마다 무엇을 하는지 미리 알려드립니다."
        />

        <ol className={styles.steps}>
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.num}>
                <span className="sr-only">단계 </span>
                {i + 1}
              </span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
