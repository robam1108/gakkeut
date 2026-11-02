import { useEffect } from "react";
import { SITE } from "../config/site";
import { FAQS } from "../content/faq";

// FAQPage는 항상, LocalBusiness는 실제 사업자 정보(상호·전화)가 채워졌을 때만 출력한다.
// 확인되지 않은 사업자 정보를 검색엔진에 노출하지 않기 위함.
export default function StructuredData() {
  useEffect(() => {
    const graph: object[] = [
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ];

    if (SITE.companyName && SITE.phone) {
      graph.push({
        "@type": "LocalBusiness",
        name: SITE.companyName,
        url: window.location.origin,
        telephone: SITE.phone,
        ...(SITE.address && { address: SITE.address }),
        ...(SITE.serviceArea && { areaServed: SITE.serviceArea }),
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
