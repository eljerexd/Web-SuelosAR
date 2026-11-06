import "server-only";

import { auth } from "@/auth";
import { isAuthorizedAdminSession } from "@/lib/admin-authorization.mjs";
import { siteConfig } from "@/lib/site";

export async function hasAdminSession() {
  if (!process.env.AUTH_SECRET || !process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) return false;
  if (process.env.NODE_ENV === "production" && process.env.AUTH_URL !== siteConfig.url) return false;
  const session = await auth();
  return isAuthorizedAdminSession(session);
}
