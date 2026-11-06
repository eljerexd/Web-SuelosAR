import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubAccountId?: string;
  }
}
