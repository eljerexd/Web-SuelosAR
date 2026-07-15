import { NextResponse } from "next/server";

import { downloads, isDownloadPlatform } from "@/lib/downloads";

export const runtime = "nodejs";

function resolveInstaller(platform: string) {
  if (!isDownloadPlatform(platform)) return null;

  const download = downloads[platform];
  return download;
}

export async function GET(request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  const installer = resolveInstaller(platform);

  if (!installer) return new NextResponse(null, { status: 404 });

  const assetUrl = new URL(`/downloads/${installer.filename}`, request.url);
  const assetResponse = await fetch(assetUrl, { cache: "no-store" });

  if (!assetResponse.ok || !assetResponse.body) {
    return NextResponse.redirect(new URL(`/download-unavailable?platform=${platform}`, request.url), 307);
  }

  return new Response(assetResponse.body, {
    headers: {
      "Content-Type": installer.contentType,
      ...(assetResponse.headers.get("content-length") ? { "Content-Length": assetResponse.headers.get("content-length")! } : {}),
      "Content-Disposition": `attachment; filename="${installer.filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function HEAD(request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  const installer = resolveInstaller(platform);

  if (!installer) return new NextResponse(null, { status: 404 });

  const assetUrl = new URL(`/downloads/${installer.filename}`, request.url);
  const assetResponse = await fetch(assetUrl, { method: "HEAD", cache: "no-store" });

  if (!assetResponse.ok) {
    return NextResponse.redirect(new URL(`/download-unavailable?platform=${platform}`, request.url), 307);
  }

  return new Response(null, {
    headers: {
      "Content-Type": installer.contentType,
      ...(assetResponse.headers.get("content-length") ? { "Content-Length": assetResponse.headers.get("content-length")! } : {}),
      "Content-Disposition": `attachment; filename="${installer.filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
