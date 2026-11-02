import Field, { FieldError, Req } from "./Field";
import {
  EXTRA_OPTIONS,
  REGION_OPTIONS,
  SERVICE_OPTIONS,
  a11yProps,
  errorId,
  fieldId,
  todayLocal,
  type EstimateData,
  type Errors,
} from "./model";
import type { SetField } from "./EstimateForm";
import styles from "./Estimate.module.css";

type Props = { data: EstimateData; errors: Errors; set: SetField };

export default function StepCleaning({ data, errors, set }: Props) {
  const toggleExtra = (x: string) =>
    set("extras", data.extras.includes(x) ? data.extras.filter((v) => v !== x) : [...data.extras, x]);

  return (
    <div className={styles.fields}>
      <fieldset
        className={styles.fieldset}
        aria-describedby={errors.serviceType ? errorId("serviceType") : undefined}
        aria-required="true"
      >
        <legend className={styles.label}>
          청소 종류
          <Req />
        </legend>
        <div className={styles.chips}>
          {SERVICE_OPTIONS.map((opt, i) => (
            <label key={opt} className={styles.chip}>
              <input
                type="radio"
                name="serviceType"
                value={opt}
                id={i === 0 ? fieldId("serviceType") : undefined}
                checked={data.serviceType === opt}
                onChange={() => set("serviceType", opt)}
                aria-invalid={errors.serviceType ? true : undefined}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        <FieldError name="serviceType" error={errors.serviceType} />
      </fieldset>

      <Field name="size" label="공간 면적" required hint="전용 면적 기준, 대략적인 평수도 괜찮습니다." error={errors.size}>
        <div className={styles.suffixWrap}>
          <input
            {...a11yProps("size", errors.size, true, true)}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="예) 25"
            value={data.size}
            onChange={(e) => set("size", e.target.value.replace(/[^\d.]/g, "").slice(0, 6))}
            className={styles.input}
          />
          <span className={styles.suffix} aria-hidden="true">
            평
          </span>
        </div>
      </Field>

      <div className={styles.row}>
        <Field name="region" label="작업 지역" required error={errors.region}>
          <select
            {...a11yProps("region", errors.region, false, true)}
            value={data.region}
            onChange={(e) => set("region", e.target.value)}
            className={styles.input}
          >
            <option value="">시·도 선택</option>
            {REGION_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field name="regionDetail" label="시·구·동" required error={errors.regionDetail}>
          <input
            {...a11yProps("regionDetail", errors.regionDetail, false, true)}
            type="text"
            autoComplete="address-level2"
            placeholder="예) 성남시 분당구 정자동"
            value={data.regionDetail}
            onChange={(e) => set("regionDetail", e.target.value)}
            className={styles.input}
          />
        </Field>
      </div>

      <Field name="date" label="희망 일정" required={!data.dateFlexible} error={errors.date}>
        <input
          {...a11yProps("date", errors.date, false, !data.dateFlexible)}
          type="date"
          min={todayLocal()}
          value={data.date}
          onChange={(e) => set("date", e.target.value)}
          className={styles.input}
        />
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={data.dateFlexible}
            onChange={(e) => set("dateFlexible", e.target.checked)}
          />
          <span>아직 날짜가 정해지지 않았어요 (일정 협의)</span>
        </label>
      </Field>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>
          추가 요청 작업 <span className={styles.optional}>선택 · 중복 가능</span>
        </legend>
        <div className={styles.chips}>
          {EXTRA_OPTIONS.map((x) => (
            <label key={x} className={styles.chip}>
              <input type="checkbox" checked={data.extras.includes(x)} onChange={() => toggleExtra(x)} />
              <span>{x}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field name="extraNote" label="추가 요청사항">
        <textarea
          {...a11yProps("extraNote")}
          rows={3}
          maxLength={500}
          placeholder="오염이 심한 곳, 특별히 신경 써야 할 부분 등을 알려주세요."
          value={data.extraNote}
          onChange={(e) => set("extraNote", e.target.value)}
          className={styles.input}
        />
      </Field>
    </div>
  );
}
