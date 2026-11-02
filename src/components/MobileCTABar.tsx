import { useEffect, useState } from "react";
import { phoneHref } from "../config/site";
import Icon from "./ui/Icon";
import styles from "./MobileCTABar.module.css";

// 모바일 하단 고정 CTA. 히어로를 지나면 나타나고, 견적 섹션이 보이는 동안에는 숨긴다.
export default function MobileCTABar() {
  const [pastHero, setPastHero] = useState(false);
  const [atEstimate, setAtEstimate] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const estimate = document.getElementById("estimate");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.1 });
      o.observe(hero);
      observers.push(o);
    }
    if (estimate) {
      const o = new IntersectionObserver(([e]) => setAtEstimate(e.isIntersecting), { threshold: 0.05 });
      o.observe(estimate);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const visible = pastHero && !atEstimate;

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} inert={!visible}>
      {phoneHref && (
        <a href={phoneHref} className={`btn btn--ghost ${styles.phone}`} aria-label="전화 문의">
          <Icon name="phone" size={20} />
        </a>
      )}
      <a href="#estimate" className={`btn btn--primary btn--lg ${styles.main}`}>
        무료 견적 신청
        <Icon name="arrowRight" size={18} />
      </a>
    </div>
  );
}
