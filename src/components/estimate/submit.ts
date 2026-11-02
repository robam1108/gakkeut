import type { EstimateData } from "./model";

const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() || "";
const ENDPOINT = "https://api.web3forms.com/submit";
const TIMEOUT_MS = 10_000;

// 키가 없으면 테스트 모드 — 실제 전송 없이 결과 화면만 확인할 수 있다 (성공으로 표시하지 않음)
export const IS_TEST_MODE = !ACCESS_KEY;

export type SubmitResult =
  | { ok: true; mode: "live" | "test" }
  | { ok: false; reason: "timeout" | "network" | "server"; message?: string };

export async function submitEstimate(data: EstimateData, botcheck: string): Promise<SubmitResult> {
  const payload = {
    subject: `[견적 신청] ${data.serviceType} · ${data.size}평 · ${data.region} ${data.regionDetail}`,
    from_name: "GAKKEUT 홈페이지",
    청소_종류: data.serviceType,
    공간_면적: `${data.size}평`,
    작업_지역: `${data.region} ${data.regionDetail}`,
    희망_일정: data.dateFlexible ? `일정 협의${data.date ? ` (참고: ${data.date})` : ""}` : data.date,
    추가_작업: data.extras.length ? data.extras.join(", ") : "없음",
    추가_요청사항: data.extraNote || "-",
    이름: data.name.trim(),
    연락처: data.phone,
    상세_주소: data.address.trim(),
    추가_문의: data.message || "-",
    개인정보_동의: data.consent ? "동의" : "미동의",
  };

  if (IS_TEST_MODE) {
    await new Promise((r) => setTimeout(r, 800));
    console.info("[견적 신청 · 테스트 모드] 실제로 전송되지 않았습니다. payload:", payload);
    return { ok: true, mode: "test" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, botcheck, ...payload }),
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    // HTTP 상태와 응답 본문 둘 다 성공일 때만 성공으로 본다
    if (res.ok && json?.success === true) return { ok: true, mode: "live" };
    return { ok: false, reason: "server", message: json?.message };
  } catch (err) {
    return { ok: false, reason: err instanceof DOMException && err.name === "AbortError" ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}
