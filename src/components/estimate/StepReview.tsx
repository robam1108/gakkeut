import { FieldError, Req } from "./Field";
import { errorId, fieldId, type EstimateData, type Errors } from "./model";
import type { SetField } from "./EstimateForm";
import styles from "./Estimate.module.css";

type Props = { data: EstimateData; errors: Errors; set: SetField; goTo: (step: number) => void };

export default function StepReview({ data, errors, set, goTo }: Props) {
  const groups = [
    {
      title: "청소 정보",
      step: 0,
      rows: [
        ["청소 종류", data.serviceType],
        ["공간 면적", `${data.size}평`],
        ["작업 지역", `${data.region} ${data.regionDetail}`],
        ["희망 일정", data.dateFlexible ? `일정 협의${data.date ? ` (참고 ${data.date})` : ""}` : data.date],
        ["추가 작업", data.extras.length ? data.extras.join(", ") : "없음"],
        ["추가 요청사항", data.extraNote || "없음"],
      ],
    },
    {
      title: "고객 정보",
      step: 1,
      rows: [
        ["이름", data.name],
        ["연락처", data.phone],
        ["상세 주소", data.address.trim() || "상담 시 안내"],
        ["추가 문의사항", data.message || "없음"],
      ],
    },
  ];

  return (
    <div className={styles.fields}>
      {groups.map((g) => (
        <section key={g.title} className={styles.summary} aria-label={`${g.title} 요약`}>
          <div className={styles.summaryHead}>
            <h4 className={styles.summaryTitle}>{g.title}</h4>
            <button type="button" className={styles.editBtn} onClick={() => goTo(g.step)}>
              수정<span className="sr-only"> — {g.title}</span>
            </button>
          </div>
          <dl className={styles.summaryList}>
            {g.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div className={styles.consent}>
        <div className={styles.consentText} tabIndex={0} role="region" aria-label="개인정보 수집 및 이용 안내">
          <p>
            <strong>수집 항목</strong> 이름, 연락처, 주소, 청소 정보
          </p>
          <p>
            <strong>수집 목적</strong> 견적 상담 및 일정 안내
          </p>
          <p>
            <strong>보유 기간</strong> 상담 완료 후 6개월 (관계 법령에 따라 보관이 필요한 경우 해당 기간)
          </p>
          <p>동의를 거부할 수 있으며, 거부 시 온라인 견적 신청이 제한됩니다.</p>
        </div>
        <label className={`${styles.check} ${styles.consentCheck}`}>
          <input
            type="checkbox"
            id={fieldId("consent")}
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            aria-required="true"
          />
          <span>
            개인정보 수집 및 이용에 동의합니다 <Req />
          </span>
        </label>
        <FieldError name="consent" error={errors.consent} />
      </div>
    </div>
  );
}
