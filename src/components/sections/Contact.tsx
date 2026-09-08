import { useState } from "react";
import { SITE } from "../../config/site";

const SERVICES = [
  "입주청소",
  "이사청소 (나가는 집)",
  "이사청소 (들어오는 집)",
  "거주청소",
  "사무실청소",
  "에어컨청소",
  "특수청소",
  "기타",
];

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "success" | "error";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    area: "",
    date: "",
    message: "",
    consent: false,
    website: "", // honeypot — 사람 눈에는 숨겨지고, 채워져 있으면 스팸 봇으로 간주
  });
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({
        ...f,
        [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
      }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!CONTACT_ENDPOINT) return;

    // 허니팟이 채워졌으면 스팸으로 간주하고 조용히 성공 화면만 보여준다 (봇에게 실패를 알리지 않음)
    if (form.website) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          service: form.service,
          area: form.area,
          date: form.date,
          message: form.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #cbd5e1",
    backgroundColor: "white",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "clamp(2rem, 6vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <p className="badge">Free Estimate</p>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
              무료 견적 문의
            </h2>
            <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: "2rem" }}>
              아래 양식을 작성해주시면 영업일 기준 4시간 내로 연락드립니다.
              급하신 경우 카카오톡 또는 전화로 문의해주세요.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📞", label: "전화 문의", value: SITE.phone, sub: SITE.hours, href: SITE.phoneHref },
                { icon: "💬", label: "카카오톡", value: SITE.kakaoId, sub: "24시간 접수 가능", href: SITE.kakaoUrl },
                { icon: "📍", label: "서비스 지역", value: SITE.area, sub: "", href: undefined },
              ].map((c) => {
                const Wrapper = c.href ? "a" : "div";
                return (
                  <Wrapper
                    key={c.label}
                    {...(c.href ? { href: c.href } : {})}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      color: "inherit",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }} aria-hidden="true">{c.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, marginBottom: "0.125rem" }}>
                        {c.label}
                      </div>
                      <div style={{ fontWeight: 700, color: "#0c1b3a" }}>{c.value}</div>
                      {c.sub && <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{c.sub}</div>}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Right — Form */}
          <div
            id="contact-form"
            style={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "clamp(1.25rem, 4vw, 2rem)",
              scrollMarginTop: "4rem",
            }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }} aria-hidden="true">✅</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0c1b3a", marginBottom: "0.5rem" }}>
                  접수 완료
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
                  4시간 내로 연락드리겠습니다.
                  <br />
                  급하신 경우 전화 또는 카카오톡으로 문의해주세요.
                </p>
              </div>
            ) : !CONTACT_ENDPOINT ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }} aria-hidden="true">🚧</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0c1b3a", marginBottom: "0.5rem" }}>
                  온라인 접수 준비 중입니다
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                  지금은 이 양식으로 접수가 전달되지 않습니다.
                  <br />
                  전화 또는 카카오톡으로 문의해주세요.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href={SITE.phoneHref}
                    className="tap"
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "#0f2356",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    📞 전화 문의
                  </a>
                  <a
                    href={SITE.kakaoUrl}
                    className="tap"
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "#f1f5f9",
                      color: "#0c1b3a",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    💬 카카오톡 문의
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} noValidate={false}>
                {/* 허니팟: 시각적으로 숨겨서 사람에게는 보이지 않고, 스팸 봇만 채운다 */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={set("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label htmlFor="cf-name" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>이름 *</label>
                    <input
                      id="cf-name"
                      required
                      aria-required="true"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="홍길동"
                      className="field"
                      autoComplete="name"
                      style={fieldStyle}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label htmlFor="cf-phone" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>연락처 *</label>
                    <input
                      id="cf-phone"
                      required
                      aria-required="true"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="010-0000-0000"
                      className="field"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label htmlFor="cf-address" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>주소 *</label>
                  <input
                    id="cf-address"
                    required
                    aria-required="true"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="서울시 강남구 ..."
                    className="field"
                    style={fieldStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label htmlFor="cf-service" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>서비스 종류 *</label>
                    <select
                      id="cf-service"
                      required
                      aria-required="true"
                      value={form.service}
                      onChange={set("service")}
                      className="field"
                      style={fieldStyle}
                    >
                      <option value="">선택해주세요</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label htmlFor="cf-area" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>평수</label>
                    <input
                      id="cf-area"
                      value={form.area}
                      onChange={set("area")}
                      placeholder="예: 25평"
                      className="field"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label htmlFor="cf-date" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>희망 날짜</label>
                  <input
                    id="cf-date"
                    type="date"
                    min={todayISO()}
                    value={form.date}
                    onChange={set("date")}
                    className="field"
                    style={fieldStyle}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label htmlFor="cf-message" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>추가 요청 사항</label>
                  <textarea
                    id="cf-message"
                    value={form.message}
                    onChange={set("message")}
                    rows={4}
                    placeholder="특별히 신경 써주셨으면 하는 부분이나 현재 상태를 알려주세요."
                    className="field"
                    style={{ ...fieldStyle, resize: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8125rem", color: "#475569", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      required
                      aria-required="true"
                      checked={form.consent}
                      onChange={set("consent")}
                      style={{ marginTop: "0.15rem" }}
                    />
                    <span>
                      (필수) 개인정보 수집·이용에 동의합니다. 수집 항목: 이름, 연락처, 주소. 수집 목적: 견적
                      상담 및 안내. 보유 기간: 상담 완료 후 6개월. 동의를 거부할 수 있으나, 거부 시 견적 문의가
                      불가합니다.
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      padding: "0.875rem 1rem",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#991b1b",
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                    }}
                  >
                    전송에 실패했습니다. 잠시 후 다시 시도하시거나, 전화({SITE.phone}) 또는 카카오톡으로
                    문의해주세요. 입력하신 내용은 그대로 남아 있습니다.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="tap"
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: status === "sending" ? "#64748b" : "#0f2356",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a3470";
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "sending") (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0f2356";
                  }}
                >
                  {status === "sending" ? "전송 중..." : "견적 문의하기"}
                </button>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center" }}>
                  제출된 정보는 견적 안내 목적으로만 사용됩니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
