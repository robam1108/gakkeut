import type { ReactNode } from "react";
import { errorId, fieldId, type FieldKey } from "./model";
import styles from "./Estimate.module.css";

type Props = {
  name: FieldKey;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

// 라벨 + 입력 + 힌트/오류 메시지 묶음. 입력 요소에는 a11yProps()로 aria 속성을 붙인다.
export default function Field({ name, label, required, hint, error, children }: Props) {
  return (
    <div className={styles.field}>
      <label htmlFor={fieldId(name)} className={styles.label}>
        {label}
        {required ? <Req /> : <span className={styles.optional}>선택</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${fieldId(name)}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      <FieldError name={name} error={error} />
    </div>
  );
}

export function Req() {
  return (
    <span className={styles.req} aria-hidden="true">
      *
    </span>
  );
}

export function FieldError({ name, error }: { name: FieldKey; error?: string }) {
  if (!error) return null;
  return (
    <p id={errorId(name)} className={styles.error}>
      {error}
    </p>
  );
}
