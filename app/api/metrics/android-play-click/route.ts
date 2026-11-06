import { incrementAndroidPlayClick } from "@/lib/metrics";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isSameSiteClick(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.NODE_ENV === "production"
    ? siteConfig.url
    : new URL(request.url).origin;
  const fetchSite = request.headers.get("sec-fetch-site");

  return origin === expectedOrigin && (!fetchSite || fetchSite === "same-origin");
}

export async function POST(request: Request) {
  if (!isSameSiteClick(request)) return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });

  try {
    const result = await incrementAndroidPlayClick();
    if (result === "unavailable") return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
    if (result === "rate_limited") return new Response(null, { status: 429, headers: { "Cache-Control": "no-store" } });
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch {
    return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
