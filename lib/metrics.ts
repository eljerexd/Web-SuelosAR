import "server-only";

import { Redis } from "@upstash/redis";

export const androidPlayClickMetricKey = "suelosar:aggregate:android-google-play-clicks:v1";
const androidPlayClickDailyMetricKey = "suelosar:aggregate:android-google-play-clicks:daily:v1";
const windowsInstallerSnapshotsMetricKey = "suelosar:aggregate:github-reported-windows-installer-downloads:daily-snapshots:v1";
const androidClickRateLimitKey = "suelosar:ratelimit:android-play-clicks:v1";
const rateLimitWindowSeconds = 60;
const maxClicksPerWindow = 120;

const incrementAndroidClickScript = `
local requests = redis.call("INCR", KEYS[1])
if requests == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
if requests > tonumber(ARGV[2]) then return 0 end
local total = redis.call("INCR", KEYS[2])
redis.call("HINCRBY", KEYS[3], ARGV[3], 1)
return total
`;

function argentinaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function parseDailyHash(value: Record<string, string> | null): Record<string, number> {
  if (!value) return {};

  return Object.fromEntries(Object.entries(value).flatMap(([day, rawCount]) => {
    const count = Number(rawCount);
    return /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isSafeInteger(count) && count >= 0
      ? [[day, count]]
      : [];
  }));
}

export function hasMetricsRedisConfiguration() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function getRedis() {
  if (!hasMetricsRedisConfiguration()) return null;
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
    enableTelemetry: false,
  });
}

export async function incrementAndroidPlayClick() {
  const redis = getRedis();
  if (!redis) return "unavailable" as const;

  const result = await redis.eval<[number, number, string], number>(
    incrementAndroidClickScript,
    [androidClickRateLimitKey, androidPlayClickMetricKey, androidPlayClickDailyMetricKey],
    [rateLimitWindowSeconds, maxClicksPerWindow, argentinaDateKey()],
  );

  return result === 0 ? "rate_limited" as const : "counted" as const;
}

export async function getAndroidPlayClickCount() {
  const redis = getRedis();
  if (!redis) return null;
  const count = await redis.get<number>(androidPlayClickMetricKey);
  return Number.isSafeInteger(count) && (count ?? -1) >= 0 ? count : 0;
}

/** Daily aggregate Android click counts; no visitor-level data is stored. */
export async function getAndroidPlayClickHistory(): Promise<Record<string, number>> {
  const redis = getRedis();
  if (!redis) return {};
  return parseDailyHash(await redis.hgetall<Record<string, string>>(androidPlayClickDailyMetricKey));
}

/** Record one daily GitHub-reported cumulative count for later aggregate deltas. */
export async function recordWindowsInstallerDownloadSnapshot(total: number, date = new Date()) {
  if (!Number.isSafeInteger(total) || total < 0) return false;
  const redis = getRedis();
  if (!redis) return false;
  await redis.hset(windowsInstallerSnapshotsMetricKey, { [argentinaDateKey(date)]: String(total) });
  return true;
}

/** Daily cumulative GitHub snapshots; deltas are calculated for display, not stored per visitor. */
export async function getWindowsInstallerDownloadSnapshots(): Promise<Record<string, number>> {
  const redis = getRedis();
  if (!redis) return {};
  return parseDailyHash(await redis.hgetall<Record<string, string>>(windowsInstallerSnapshotsMetricKey));
}
