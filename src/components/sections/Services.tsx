import { useRef, useState } from "react";
import { SERVICES } from "../../content/services";
import SectionHeader from "../ui/SectionHeader";
import Icon from "../ui/Icon";
import styles from "./Services.module.css";

export default function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SERVICES[active];

  // WAI-ARIA 탭 패턴: 좌우/상하 방향키, Home/End로 탭 이동
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: SERVICES.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + SERVICES.length) % SERVICES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeader
            id="services-title"
            eyebrow="Services"
            title="공간에 맞는 청소를 선택하세요"
            desc="서비스마다 작업 범위가 다릅니다. 필요한 서비스를 고르면 주요 작업 범위를 확인할 수 있습니다."
          />
        </div>

        <div className={styles.layout}>
          <div role="tablist" aria-label="청소 서비스 종류" aria-orientation="vertical" className={styles.tabs}>
            {SERVICES.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`svc-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.tabText}>
                  <span className={styles.tabTitle}>{item.title}</span>
                  <span className={styles.tabSummary}>{item.summary}</span>
                </span>
              </button>
            ))}
          </div>

          <div
            id="svc-panel"
            role="tabpanel"
            aria-labelledby={`svc-tab-${s.id}`}
            className={styles.panel}
            key={s.id}
          >
            <figure className={styles.media}>
              <img
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className={styles.body}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <p className={styles.scopeLabel}>주요 작업 범위</p>
              <ul className={styles.scope}>
                {s.scope.map((x) => (
                  <li key={x}>
                    <Icon name="check" size={16} className={styles.check} />
                    {x}
                  </li>
                ))}
              </ul>
              <a href="#estimate" className={`btn btn--ghost ${styles.cta}`}>
                {s.title} 견적 받기
                <Icon name="arrowRight" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
