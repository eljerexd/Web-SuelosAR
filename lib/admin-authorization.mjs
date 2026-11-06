export const adminGitHubAccountId = "223554037";

export function isAuthorizedGitHubAccountId(value, expectedId = adminGitHubAccountId) {
  const actualId = typeof value === "number" && Number.isSafeInteger(value)
    ? String(value)
    : typeof value === "string"
      ? value
      : "";

  return /^\d+$/.test(actualId) && actualId === expectedId;
}

export function isAuthorizedAdminSession(session) {
  return session?.user?.isAdmin === true;
}
