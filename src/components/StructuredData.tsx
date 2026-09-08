import { useEffect } from "react";
import { SITE } from "../config/site";
import { FAQS } from "../content/faq";

// LocalBusiness/FAQPage 구조화 데이터를 런타임에 주입한다.
// SITE·FAQS를 그대로 재사용해 화면에 보이는 정보와 항상 일치시킨다.
// 이 프로젝트는 포트폴리오 데모이므로 아래 값은 전부 예시이며 실제 업체 정보가 아니다.
export default function StructuredData() {
  useEffect(() => {
    const origin = window.location.origin;
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          name: `${SITE.name} 청소 서비스`,
          url: origin,
          telephone: SITE.phone,
          areaServed: SITE.area,
          openingHours: SITE.hours,
          priceRange: "₩₩",
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
