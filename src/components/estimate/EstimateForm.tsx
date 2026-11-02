import { useEffect, useRef, useState } from "react";
import { phoneHref, kakaoHref, siteValue } from "../../config/site";
import SectionHeader from "../ui/SectionHeader";
import Icon from "../ui/Icon";
import StepCleaning from "./StepCleaning";
import StepCustomer from "./StepCustomer";
import StepReview from "./StepReview";
import { INITIAL_DATA, SELECT_SERVICE_EVENT, STEPS, fieldId, type EstimateData, type Errors, type FieldKey } from "./model";
import { validateStep } from "./validation";
import { IS_TEST_MODE, submitEstimate, type SubmitResult } from "./submit";
import styles from "./Estimate.module.css";

export type SetField = <K extends FieldKey>(key: K, value: EstimateData[K]) => void;

type Status = "editing" | "submitting" | "done";

const DRAFT_KEY = "gakkeut-estimate-draft";
const MIN_FILL_MS = 3000; // 열람 후 3초 안에 제출되면 봇으로 간주

function loadDraft(): { step: number; data: EstimateData } {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { step?: number; data?: Partial<EstimateData> };
      return {
        step: Math.min(Math.max(Number(parsed.step) || 0, 0), STEPS.length - 1),
        data: { ...INITIAL_DATA, ...parsed.data, consent: false },
      };
    }
  } catch {
    /* 스토리지 차단 환경 — 새로 시작 */
  }
  return { step: 0, data: INITIAL_DATA };
}

export default function EstimateForm() {
  const [initial] = useState(loadDraft);
  const [step, setStep] = useState(initial.step);
  const [data, setData] = useState<EstimateData>(initial.data);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("editing");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [botcheck, setBotcheck] = useState("");
  const [openedAt] = useState(() => Date.now());

  const submittingRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);

  // 입력 내용 유지: 단계를 오가거나 새로고침해도 세션 동안 보존
  useEffect(() => {
    if (status === "done" && result?.ok) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, data: { ...data, consent: false } }));
    } catch {
      /* noop */
    }
  }, [step, data, status, result]);

  // 단계 전환 시 단계 제목으로 포커스 (최초 렌더에는 이동하지 않음)
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    headingRef.current?.focus({ preventScroll: true });
    // 폼 상단이 고정 헤더 위로 올라가 있으면 다시 보이도록 스크롤
    const form = headingRef.current?.closest("form");
    if (form) {
      const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const top = form.getBoundingClientRect().top;
      if (top < headerH) window.scrollTo({ top: window.scrollY + top - headerH - 16, behavior: "smooth" });
    }
  }, [step]);

  useEffect(() => {
    if (status === "done") resultRef.current?.focus();
  }, [status]);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      setData((d) => ({ ...d, serviceType: service }));
      setErrors((errs) => {
        const next = { ...errs };
        delete next.serviceType;
        return next;
      });
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const set: SetField = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key] || (key === "dateFlexible" && errors.date)) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        if (key === "dateFlexible") delete next.date;
        return next;
      });
    }
  };

  const goTo = (next: number) => {
    moveFocus.current = true;
    setErrors({});
    setStep(next);
  };

  const focusFirstError = (errs: Errors) => {
    const first = STEPS[step].fields.find((k) => errs[k]);
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }

    if (submittingRef.current) return; // 중복 제출 방지
    submittingRef.current = true;
    setStatus("submitting");

    let res: SubmitResult;
    if (botcheck || Date.now() - openedAt < MIN_FILL_MS) {
      res = { ok: false, reason: "server", message: "spam" };
    } else {
      res = await submitEstimate(data, botcheck);
    }

    setResult(res);
    setStatus("done");
    submittingRef.current = false;

    if (res.ok && res.mode === "live") {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* noop */
      }
    }
  };

  const resetAll = () => {
    setData(INITIAL_DATA);
    setStep(0);
    setErrors({});
    setResult(null);
    setStatus("editing");
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* noop */
    }
  };

  const backToForm = () => {
    setResult(null);
    setStatus("editing");
    moveFocus.current = true;
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <section id="estimate" className={`section ${styles.section}`} aria-labelledby="estimate-title">
      <div className={`container ${styles.grid}`}>
        <aside className={styles.intro}>
          <SectionHeader
            id="estimate-title"
            tone="light"
            eyebrow="Free Estimate"
            title="무료 견적 신청"
            desc="세 단계로 공간 정보를 남겨주세요. 내용을 확인한 뒤 상담 연락을 드리고, 범위를 확인한 후 견적을 안내합니다."
          />
          <ul className={styles.introList}>
            <li>
              <Icon name="check" size={18} />
              신청은 무료이며, 견적 안내 후 진행 여부를 결정하시면 됩니다.
            </li>
            <li>
              <Icon name="check" size={18} />
              최종 금액은 상담으로 범위를 확인한 뒤 확정됩니다.
            </li>
            <li>
              <Icon name="check" size={18} />
              입력하신 정보는 견적 상담 목적으로만 사용됩니다.
            </li>
          </ul>
          {/* 대표 번호가 등록된 경우에만 노출 — 플레이스홀더를 크게 보여주지 않는다 */}
          {phoneHref && (
            <div className={styles.introContact}>
              <p className={styles.introContactLabel}>전화 상담</p>
              <a href={phoneHref} className={styles.introPhone}>
                {siteValue("phone")}
              </a>
              <p className={styles.introHours}>{siteValue("hours")}</p>
            </div>
          )}
        </aside>

        <div className={styles.panel}>
          {IS_TEST_MODE && (
            <p className={styles.testBadge} role="note">
              <Icon name="alert" size={16} />
              테스트 모드 — 전송 키가 설정되지 않아 신청 내용이 실제로 전송되지 않습니다.
            </p>
          )}

          {status === "done" && result ? (
            <ResultView
              result={result}
              ref={resultRef}
              onReset={resetAll}
              onBack={backToForm}
              onRetry={() => {
                setStatus("editing");
                setResult(null);
              }}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"} className={styles.form}>
              <div className={styles.progress}>
                <div className={styles.progressMeta}>
                  <span>
                    STEP {step + 1} <span className={styles.progressTotal}>/ {STEPS.length}</span>
                  </span>
                  <ol className={styles.progressSteps}>
                    {STEPS.map((s, i) => (
                      <li
                        key={s.title}
                        className={i === step ? styles.stepCurrent : i < step ? styles.stepDone : undefined}
                        aria-current={i === step ? "step" : undefined}
                      >
                        {s.title}
                      </li>
                    ))}
                  </ol>
                </div>
                <div
                  className={styles.track}
                  role="progressbar"
                  aria-label="견적 신청 진행률"
                  aria-valuemin={1}
                  aria-valuemax={STEPS.length}
                  aria-valuenow={step + 1}
                  aria-valuetext={`${STEPS.length}단계 중 ${step + 1}단계: ${STEPS[step].title}`}
                >
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                {STEPS[step].title}
              </h3>

              {/* 허니팟: 사람에게는 보이지 않고 봇만 채운다 */}
              <div className={styles.honeypot} aria-hidden="true">
                <label>
                  비워두세요
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                  />
                </label>
              </div>

              {Object.keys(errors).length > 0 && (
                <p className={styles.errorSummary} role="alert">
                  <Icon name="alert" size={16} />
                  입력 내용을 확인해주세요. 표시된 항목 {Object.keys(errors).length}개를 수정해야 합니다.
                </p>
              )}

              {step === 0 && <StepCleaning data={data} errors={errors} set={set} />}
              {step === 1 && <StepCustomer data={data} errors={errors} set={set} />}
              {step === 2 && <StepReview data={data} errors={errors} set={set} goTo={goTo} />}

              <div className={styles.nav}>
                {step > 0 && (
                  <button
                    type="button"
                    className="btn btn--ghost btn--lg"
                    onClick={() => goTo(step - 1)}
                    disabled={status === "submitting"}
                  >
                    <Icon name="arrowLeft" size={18} />
                    이전
                  </button>
                )}
                <button type="submit" className={`btn btn--primary btn--lg ${styles.next}`} disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      전송 중…
                    </>
                  ) : step < STEPS.length - 1 ? (
                    <>
                      다음 단계
                      <Icon name="arrowRight" size={18} />
                    </>
                  ) : (
                    "견적 신청하기"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type ResultProps = {
  result: SubmitResult;
  ref: React.Ref<HTMLDivElement>;
  onReset: () => void;
  onBack: () => void;
  onRetry: () => void;
};

function ResultView({ result, ref, onReset, onBack, onRetry }: ResultProps) {
  const contact = (
    <div className={styles.resultContact}>
      {phoneHref && (
        <a href={phoneHref} className="btn btn--ghost">
          <Icon name="phone" size={18} />
          전화 문의
        </a>
      )}
      {kakaoHref && (
        <a href={kakaoHref} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
          <Icon name="chat" size={18} />
          카카오톡 문의
        </a>
      )}
    </div>
  );

  if (result.ok && result.mode === "live") {
    return (
      <div ref={ref} tabIndex={-1} className={styles.result} role="status">
        <span className={`${styles.resultIcon} ${styles.resultOk}`}>
          <Icon name="check" size={28} />
        </span>
        <h3 className={styles.resultTitle}>견적 신청이 접수되었습니다</h3>
        <p className={styles.resultDesc}>
          남겨주신 연락처로 상담 연락을 드리겠습니다.
          {phoneHref && (
            <>
              <br />
              급한 문의는 전화로 연락해주세요.
            </>
          )}
        </p>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          새 견적 신청하기
        </button>
      </div>
    );
  }

  if (result.ok && result.mode === "test") {
    return (
      <div ref={ref} tabIndex={-1} className={styles.result} role="status">
        <span className={`${styles.resultIcon} ${styles.resultTest}`}>
          <Icon name="alert" size={28} />
        </span>
        <h3 className={styles.resultTitle}>테스트 모드 — 실제로 전송되지 않았습니다</h3>
        <p className={styles.resultDesc}>
          입력값 검증과 전송 흐름만 확인했습니다. 신청 내용은 브라우저 콘솔에 출력되었습니다.
          <br />
          실제 접수를 받으려면 <code>VITE_FORMSPREE_ENDPOINT</code>를 설정하세요.
        </p>
        <div className={styles.resultActions}>
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            입력 내용 다시 보기
          </button>
          <button type="button" className="btn btn--primary" onClick={onReset}>
            처음부터 다시
          </button>
        </div>
      </div>
    );
  }

  const reason = !result.ok ? result.reason : "server";
  const msg =
    reason === "timeout"
      ? "서버 응답이 지연되고 있습니다."
      : reason === "network"
        ? "네트워크 연결을 확인해주세요."
        : "신청을 처리하지 못했습니다.";

  return (
    <div ref={ref} tabIndex={-1} className={styles.result} role="alert">
      <span className={`${styles.resultIcon} ${styles.resultFail}`}>
        <Icon name="alert" size={28} />
      </span>
      <h3 className={styles.resultTitle}>신청이 전송되지 않았습니다</h3>
      <p className={styles.resultDesc}>
        {msg} 입력하신 내용은 그대로 남아 있으니 잠시 후 다시 시도해주세요.
      </p>
      <div className={styles.resultActions}>
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          다시 시도하기
        </button>
      </div>
      {contact}
    </div>
  );
}
