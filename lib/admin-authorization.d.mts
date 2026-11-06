export const adminGitHubAccountId: string;
export function isAuthorizedGitHubAccountId(value: unknown, expectedId?: string): boolean;
export function isAuthorizedAdminSession(session: { user?: { isAdmin?: boolean } } | null | undefined): boolean;
