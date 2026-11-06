import { getGitHubReportedWindowsInstallerDownloads } from "@/lib/downloads";
import { hasAdminSession } from "@/lib/admin-session";
import { getAndroidPlayClickCount } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!await hasAdminSession()) return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });

  try {
    const [androidGooglePlayButtonClicks, githubReportedInstallerDownloads] = await Promise.all([
      getAndroidPlayClickCount(),
      getGitHubReportedWindowsInstallerDownloads(),
    ]);

    return Response.json({
      androidGooglePlayButtonClicks,
      githubReportedInstallerDownloads,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ error: "Metrics temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}
