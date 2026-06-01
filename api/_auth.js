import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "mari_diagnosis_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function getSecret() {
  return process.env.SESSION_SECRET || process.env.ACCESS_PASSWORD || "";
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function readCookie(req, name) {
  const cookies = req.headers.cookie || "";
  const target = `${name}=`;
  const cookie = cookies.split(";").map((item) => item.trim()).find((item) => item.startsWith(target));

  return cookie ? decodeURIComponent(cookie.slice(target.length)) : "";
}

function sessionCookie(token, maxAge = SESSION_MAX_AGE) {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV;
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function sendJson(res, statusCode, body, headers = {}) {
  res.statusCode = statusCode;
  Object.entries({
    "Content-Type": "application/json; charset=utf-8",
    ...headers
  }).forEach(([key, value]) => res.setHeader(key, value));
  res.end(JSON.stringify(body));
}

export function isAuthConfigured() {
  return Boolean(process.env.ACCESS_PASSWORD);
}

export function verifyPassword(password) {
  const expected = process.env.ACCESS_PASSWORD || "";

  if (!expected || typeof password !== "string") {
    return false;
  }

  const submittedHash = createHmac("sha256", "password-check").update(password).digest();
  const expectedHash = createHmac("sha256", "password-check").update(expected).digest();

  return timingSafeEqual(submittedHash, expectedHash);
}

export function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = base64Url(JSON.stringify({ expiresAt }));
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function hasValidSession(req) {
  const secret = getSecret();

  if (!secret) {
    return false;
  }

  const token = readCookie(req, COOKIE_NAME);
  const [payload, signature] = token.split(".");

  if (!payload || !signature || sign(payload) !== signature) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number(session.expiresAt) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function setSessionCookie(res, token) {
  res.setHeader("Set-Cookie", sessionCookie(token));
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", sessionCookie("", 0));
}
