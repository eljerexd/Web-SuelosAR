import { timingSafeEqual } from "node:crypto";

import { getGitHubReportedWindowsInstallerDownloads } from "@/lib/downloads";
import { recordWindowsInstallerDownloadSnapshot } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorizedCronRequest(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

  if (!secret || !token) return false;
  const expected = Buffer.from(secret);
  const received = Buffer.from(token);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  const total = await getGitHubReportedWindowsInstallerDownloads();
  if (total === null) {
    return Response.json({ error: "GitHub installer count unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const saved = await recordWindowsInstallerDownloadSnapshot(total);
    if (!saved) throw new Error("Metrics storage unavailable");
    return Response.json({ recorded: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Snapshot storage unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
