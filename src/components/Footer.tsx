import { SITE, siteValue, phoneHref, kakaoHref } from "../config/site";
import { NAV } from "../content/nav";
import Logo from "./ui/Logo";
import Icon from "./ui/Icon";
import styles from "./Footer.module.css";

const INFO = [
  { label: "상호", key: "companyName" },
  { label: "대표자", key: "ceo" },
  { label: "사업자등록번호", key: "businessNumber" },
  { label: "주소", key: "address" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo tone="light" />
            <p className={styles.tagline}>공간의 가치를 지키는 전문적인 청소.</p>
            <div className={styles.contactBtns}>
              {phoneHref ? (
                <a href={phoneHref} className="btn btn--accent">
                  <Icon name="phone" size={18} />
                  전화 연결
                </a>
              ) : (
                <span className={`btn btn--ghost-light ${styles.disabled}`} aria-disabled="true">
                  <Icon name="phone" size={18} />
                  전화 연결 준비 중
                </span>
              )}
              {kakaoHref ? (
                <a href={kakaoHref} className="btn btn--ghost-light" target="_blank" rel="noopener noreferrer">
                  <Icon name="chat" size={18} />
                  카카오톡 상담
                </a>
              ) : (
                <span className={`btn btn--ghost-light ${styles.disabled}`} aria-disabled="true">
                  <Icon name="chat" size={18} />
                  카카오톡 준비 중
                </span>
              )}
            </div>
          </div>

          <nav aria-label="하단 메뉴" className={styles.col}>
            <p className={styles.colTitle}>바로가기</p>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.link}>
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#estimate" className={styles.link}>
                  견적 신청
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colTitle}>고객 문의</p>
            <dl className={styles.dl}>
              <div>
                <dt>전화</dt>
                <dd>{siteValue("phone")}</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>{siteValue("email")}</dd>
              </div>
              <div>
                <dt>영업시간</dt>
                <dd>{siteValue("hours")}</dd>
              </div>
              <div>
                <dt>서비스 지역</dt>
                <dd>{siteValue("serviceArea")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.bottom}>
          <dl className={styles.biz}>
            {INFO.map((i) => (
              <div key={i.key}>
                <dt>{i.label}</dt>
                <dd>{siteValue(i.key)}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.legal}>
            <a href={SITE.privacyUrl} className={styles.legalStrong}>
              개인정보 처리방침
            </a>
            <a href={SITE.termsUrl}>이용약관</a>
            <span>© {new Date().getFullYear()} GAKKEUT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
