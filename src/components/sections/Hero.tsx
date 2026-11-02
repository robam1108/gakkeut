import Icon from "../ui/Icon";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Professional Cleaning Service</p>
          <h1 id="hero-title" className={styles.title}>
            공간의 가치를 지키는
            <br />
            전문적인 청소.
          </h1>
          <p className={styles.lead}>
            보이지 않는 곳까지 꼼꼼하게.
            <br className={styles.br} /> 공간과 오염 상태에 맞는 전문 청소 서비스를 제공합니다.
          </p>
          <div className={styles.actions}>
            <a href="#estimate" className="btn btn--primary btn--lg">
              무료 견적 신청
              <Icon name="arrowRight" size={18} />
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              서비스 알아보기
            </a>
          </div>
          <p className={styles.note}>입주 · 이사 · 거주 · 주방·욕실 · 상업 공간</p>
        </div>

        <figure className={styles.media}>
          <img
            src="/images/hero/hero.webp"
            alt="파란 장갑을 낀 손이 흰 표면을 닦는 모습"
            width={1600}
            height={1200}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
