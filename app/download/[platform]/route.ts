import { NextResponse } from "next/server";

import { getLatestReleaseAssets, isDownloadPlatform } from "@/lib/downloads";

export const runtime = "nodejs";

async function resolveDownload(request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  if (!isDownloadPlatform(platform)) return new NextResponse(null, { status: 404 });

  try {
    const assets = await getLatestReleaseAssets();
    const assetUrl = assets[platform];

    if (assetUrl) return NextResponse.redirect(assetUrl, 307);
  } catch {
    // The friendly page avoids a broken download when GitHub is unavailable.
  }

  return NextResponse.redirect(new URL(`/download-unavailable?platform=${platform}`, request.url), 307);
}

export async function GET(request: Request, context: { params: Promise<{ platform: string }> }) {
  return resolveDownload(request, context);
}

export async function HEAD(request: Request, context: { params: Promise<{ platform: string }> }) {
  return resolveDownload(request, context);
}
