import { useState } from "react";

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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    area: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
    <section id="contact" style={{ padding: "clamp(3.5rem, 10vw, 6rem) 0", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.25rem" }}>
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
                { icon: "📞", label: "전화 문의", value: "010-1234-5678", sub: "평일 09:00 ~ 18:00" },
                { icon: "💬", label: "카카오톡", value: "@깨끗청소", sub: "24시간 접수 가능" },
                { icon: "📍", label: "서비스 지역", value: "서울·경기 전역", sub: "" },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, marginBottom: "0.125rem" }}>
                      {c.label}
                    </div>
                    <div style={{ fontWeight: 700, color: "#0c1b3a" }}>{c.value}</div>
                    {c.sub && <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{c.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "clamp(1.25rem, 4vw, 2rem)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0c1b3a", marginBottom: "0.5rem" }}>
                  접수 완료
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
                  4시간 내로 연락드리겠습니다.
                  <br />
                  급하신 경우 전화 또는 카카오톡으로 문의해주세요.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>이름 *</label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="홍길동"
                      className="field"
                      style={fieldStyle}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>연락처 *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="010-0000-0000"
                      className="field"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>주소 *</label>
                  <input
                    required
                    value={form.address}
                    onChange={set("address")}
                    placeholder="서울시 강남구 ..."
                    className="field"
                    style={fieldStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>서비스 종류 *</label>
                    <select
                      required
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
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>평수</label>
                    <input
                      value={form.area}
                      onChange={set("area")}
                      placeholder="예: 25평"
                      className="field"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>희망 날짜</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={set("date")}
                    className="field"
                    style={fieldStyle}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>추가 요청 사항</label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    rows={4}
                    placeholder="특별히 신경 써주셨으면 하는 부분이나 현재 상태를 알려주세요."
                    className="field"
                    style={{ ...fieldStyle, resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  className="tap"
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "#0f2356",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a3470"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0f2356"; }}
                >
                  견적 문의하기
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
