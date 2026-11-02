import { useState } from "react";
import { FAQS } from "../../content/faq";
import { phoneHref } from "../../config/site";
import SectionHeader from "../ui/SectionHeader";
import Icon from "../ui/Icon";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHeader id="faq-title" eyebrow="FAQ" title="자주 묻는 질문" />
          <p className={styles.more}>
            찾는 답이 없다면{" "}
            {phoneHref ? (
              <>
                <a href={phoneHref} className={styles.moreLink}>
                  전화
                </a>
                로 문의해 주세요.
              </>
            ) : (
              <>
                <a href="#estimate" className={styles.moreLink}>
                  견적 신청서
                </a>
                에 남겨 주세요.
              </>
            )}
          </p>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={styles.item}>
                <h3 className={styles.qWrap}>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className={styles.q}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <Icon name="plus" size={20} className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`${styles.a} ${isOpen ? styles.aOpen : ""}`}
                  inert={!isOpen}
                >
                  <div className={styles.aInner}>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
