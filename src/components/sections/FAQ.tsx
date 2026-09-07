import { useState } from "react";

const FAQS = [
  {
    q: "견적은 어떻게 받나요?",
    a: "카카오톡, 전화, 또는 홈페이지 문의폼으로 평수·청소 종류·현재 상태(사진 첨부 가능)를 알려주시면 당일 내로 견적을 드립니다. 방문 견적도 무료로 가능합니다.",
  },
  {
    q: "작업 시간은 얼마나 걸리나요?",
    a: "입주청소 기준, 25평 약 4~6시간입니다. 오염 정도와 평수에 따라 달라집니다. 견적 시 예상 시간을 함께 안내해드립니다.",
  },
  {
    q: "청소 약품은 안전한가요?",
    a: "환경부 인증 친환경 세제만 사용합니다. 영유아, 반려동물이 있어도 안심하고 맡기실 수 있습니다. 사용 약품 목록이 필요하시면 별도 안내해드립니다.",
  },
  {
    q: "청소 후 마음에 들지 않으면요?",
    a: "작업 완료 후 고객님과 함께 전 구역을 확인합니다. 미흡한 부분이 있으면 즉시 재청소해드립니다. 작업 당일 퇴실 후 발견된 문제도 48시간 내 신고 시 무상으로 재처리합니다.",
  },
  {
    q: "결제는 어떻게 하나요?",
    a: "작업 완료 확인 후 계좌이체 또는 카드 결제 모두 가능합니다. 세금계산서·현금영수증 발급도 됩니다.",
  },
  {
    q: "작업 중 물건이 파손되면 어떻게 하나요?",
    a: "저희는 배상책임보험에 가입되어 있습니다. 작업 중 파손이 발생하면 보험 처리 또는 직접 배상해드립니다. 귀중품은 사전에 별도 보관을 권장합니다.",
  },
  {
    q: "정기 청소 할인이 있나요?",
    a: "월 1회 이상 정기 계약 시 10~20% 할인이 적용됩니다. 계약 기간과 횟수에 따라 혜택이 달라지니 상담 시 말씀해주세요.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "clamp(3.5rem, 10vw, 6rem) 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.25rem" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 8vw, 4rem)" }}>
          <p className="badge">FAQ</p>
          <h2 className="section-title">자주 묻는 질문</h2>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid #e2e8f0" : "none" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="tap"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.25rem 0",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "1rem" }}>{f.q}</span>
                <svg
                  fill="none"
                  stroke="#94a3b8"
                  viewBox="0 0 24 24"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {open === i && (
                <div
                  style={{
                    paddingBottom: "1.25rem",
                    color: "#475569",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                  }}
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
