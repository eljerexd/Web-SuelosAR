import { NextResponse } from "next/server";

import { isDownloadPlatform, resolveLatestDownloadUrl } from "@/lib/downloads";

export const runtime = "nodejs";

async function resolveDownload(context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  if (!isDownloadPlatform(platform)) return new NextResponse(null, { status: 404 });

  return NextResponse.redirect(await resolveLatestDownloadUrl(platform), 307);
}

export async function GET(_request: Request, context: { params: Promise<{ platform: string }> }) {
  return resolveDownload(context);
}

export async function HEAD(_request: Request, context: { params: Promise<{ platform: string }> }) {
  return resolveDownload(context);
}
