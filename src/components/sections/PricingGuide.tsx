import { PRICING_FACTORS } from "../../content/principles";
import SectionHeader from "../ui/SectionHeader";
import Icon from "../ui/Icon";
import styles from "./PricingGuide.module.css";

export default function PricingGuide() {
  return (
    <section id="pricing" className="section section--surface" aria-labelledby="pricing-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHeader
            id="pricing-title"
            eyebrow="Pricing Guide"
            title="견적은 이렇게 산정됩니다"
            desc="같은 평수라도 공간의 상태와 요청 범위에 따라 필요한 작업이 달라집니다. 정해진 가격표 대신 아래 기준으로 공간에 맞는 견적을 안내합니다."
          />
          <div className={styles.callout}>
            <p className={styles.calloutTitle}>정확한 금액은 상담 후 안내드립니다</p>
            <p className={styles.calloutDesc}>
              신청서에 공간 정보를 남겨주시면 범위를 확인한 뒤 견적을 드립니다. 견적 신청은 무료이며, 안내받은 뒤 진행 여부를
              결정하시면 됩니다.
            </p>
            <a href="#estimate" className="btn btn--primary btn--lg">
              내 공간 견적 받기
              <Icon name="arrowRight" size={18} />
            </a>
          </div>
        </div>

        <dl className={styles.factors}>
          {PRICING_FACTORS.map((f, i) => (
            <div key={f.title} className={styles.factor}>
              <dt className={styles.factorTitle}>
                <span className={styles.factorNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.title}
              </dt>
              <dd className={styles.factorDesc}>{f.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
