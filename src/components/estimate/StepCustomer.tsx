import Field from "./Field";
import { a11yProps } from "./model";
import { formatPhone } from "./validation";
import type { EstimateData, Errors } from "./model";
import type { SetField } from "./EstimateForm";
import styles from "./Estimate.module.css";

type Props = { data: EstimateData; errors: Errors; set: SetField };

export default function StepCustomer({ data, errors, set }: Props) {
  return (
    <div className={styles.fields}>
      <div className={styles.row}>
        <Field name="name" label="이름" required error={errors.name}>
          <input
            {...a11yProps("name", errors.name, false, true)}
            type="text"
            autoComplete="name"
            maxLength={30}
            placeholder="홍길동"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            className={styles.input}
          />
        </Field>
        <Field name="phone" label="연락처" required hint="상담 연락을 드릴 번호입니다." error={errors.phone}>
          <input
            {...a11yProps("phone", errors.phone, true, true)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-0000-0000"
            value={data.phone}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
            className={styles.input}
          />
        </Field>
      </div>

      <Field name="address" label="상세 주소" hint="미리 알려주시면 상담이 더 빨라집니다." error={errors.address}>
        <input
          {...a11yProps("address", errors.address, true)}
          type="text"
          autoComplete="street-address"
          placeholder="예) ○○아파트 101동 1001호"
          value={data.address}
          onChange={(e) => set("address", e.target.value)}
          className={styles.input}
        />
      </Field>

      <Field name="message" label="추가 문의사항">
        <textarea
          {...a11yProps("message")}
          rows={4}
          maxLength={1000}
          placeholder="상담 가능한 시간대나 궁금한 점을 남겨주세요."
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          className={styles.input}
        />
      </Field>
    </div>
  );
}
