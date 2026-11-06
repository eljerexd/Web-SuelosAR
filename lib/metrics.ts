import "server-only";

import { Redis } from "@upstash/redis";

export const androidPlayClickMetricKey = "suelosar:aggregate:android-google-play-clicks:v1";
const androidClickRateLimitKey = "suelosar:ratelimit:android-play-clicks:v1";
const rateLimitWindowSeconds = 60;
const maxClicksPerWindow = 120;

const incrementAndroidClickScript = `
local requests = redis.call("INCR", KEYS[1])
if requests == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
if requests > tonumber(ARGV[2]) then return 0 end
return redis.call("INCR", KEYS[2])
`;

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

  const result = await redis.eval<[number, number], number>(
    incrementAndroidClickScript,
    [androidClickRateLimitKey, androidPlayClickMetricKey],
    [rateLimitWindowSeconds, maxClicksPerWindow],
  );

  return result === 0 ? "rate_limited" as const : "counted" as const;
}

export async function getAndroidPlayClickCount() {
  const redis = getRedis();
  if (!redis) return null;
  const count = await redis.get<number>(androidPlayClickMetricKey);
  return Number.isSafeInteger(count) && (count ?? -1) >= 0 ? count : 0;
}
