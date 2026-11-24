import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "devstatis_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const STATE_COOKIE = "devstatis_oauth_state";
const NEXT_COOKIE = "devstatis_oauth_next";

function getSecret() {
  return process.env.SESSION_SECRET || null;
}

export function createOAuthState() {
  return randomBytes(24).toString("hex");
}

export function sessionCookieOptions(request) {
  let secure = process.env.NODE_ENV === "production";

  if (request?.nextUrl) {
    secure = request.nextUrl.protocol === "https:";
  }

  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function oauthCookieOptions(request) {
  return {
    ...sessionCookieOptions(request),
    maxAge: 60 * 10,
  };
}

export function createSessionToken(user) {
  const secret = getSecret();

  if (!secret) {
    throw new Error("SESSION_SECRET is missing.");
  }

  const payload = {
    sub: String(user.id),
    login: user.login,
    name: user.name || user.login,
    avatar: user.avatar_url || "",
    url: user.html_url || `https://github.com/${user.login}`,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

export function verifySessionToken(token) {
  const secret = getSecret();

  if (!secret || typeof token !== "string") return null;

  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) return null;

  const expected = createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    );

    if (
      !payload?.login ||
      !payload?.exp ||
      payload.exp * 1000 < Date.now()
    ) {
      return null;
    }

    return {
      id: payload.sub,
      login: payload.login,
      name: payload.name || payload.login,
      avatar: payload.avatar || "",
      url: payload.url || `https://github.com/${payload.login}`,
    };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  return verifySessionToken(token);
}

export function setOAuthCookies(response, request, state, next) {
  const options = oauthCookieOptions(request);

  response.cookies.set(STATE_COOKIE, state, options);
  response.cookies.set(NEXT_COOKIE, next, options);

  return response;
}

export function clearOAuthCookies(response) {
  const options = { path: "/", maxAge: 0 };

  response.cookies.set(STATE_COOKIE, "", options);
  response.cookies.set(NEXT_COOKIE, "", options);

  return response;
}

export function getOAuthState(request) {
  return request.cookies.get(STATE_COOKIE)?.value || null;
}

export function getOAuthNext(request) {
  return request.cookies.get(NEXT_COOKIE)?.value || null;
}
