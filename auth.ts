import "server-only";

import NextAuth from "next-auth";
import GitHub, { type GitHubProfile } from "next-auth/providers/github";

import { adminGitHubAccountId, isAuthorizedGitHubAccountId } from "@/lib/admin-authorization.mjs";
import { siteConfig } from "@/lib/site";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub({
    authorization: { params: { scope: "read:user" } },
    userinfo: {
      url: "https://api.github.com/user",
      async request({ tokens }: { tokens: { access_token?: string | null } }) {
        if (!tokens.access_token) throw new Error("GitHub administrator authentication failed");
        const response = await fetch("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${tokens.access_token}`, Accept: "application/vnd.github+json" },
          cache: "no-store",
        });
        if (!response.ok) throw new Error("GitHub administrator authentication failed");
        const profile = await response.json() as { id?: number };
        return { id: profile.id };
      },
    },
    profile(profile: GitHubProfile) {
      return { id: String(profile.id) };
    },
  })],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async signIn({ account, profile }) {
      return account?.provider === "github" && isAuthorizedGitHubAccountId(profile?.id);
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        token.githubAccountId = isAuthorizedGitHubAccountId(profile.id) ? String(profile.id) : "";
        delete token.name;
        delete token.email;
        delete token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          isAdmin: isAuthorizedGitHubAccountId(token.githubAccountId, adminGitHubAccountId),
        } as typeof session.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      try {
        const safeBaseUrl = process.env.NODE_ENV === "production" ? siteConfig.url : baseUrl;
        const target = new URL(url, safeBaseUrl);
        const base = new URL(safeBaseUrl);
        if (target.origin !== base.origin) return safeBaseUrl;
        if (process.env.NODE_ENV === "production" && target.protocol !== "https:") return safeBaseUrl;
        return target.toString();
      } catch {
        return process.env.NODE_ENV === "production" ? siteConfig.url : baseUrl;
      }
    },
  },
});
