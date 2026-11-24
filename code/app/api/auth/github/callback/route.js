import { NextResponse } from "next/server";
import {
  clearOAuthCookies,
  createSessionToken,
  getOAuthNext,
  getOAuthState,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";
import { safeNextPath } from "@/lib/redirect";
import { getAppOrigin } from "@/lib/app-url";

export const runtime = "nodejs";

function loginRedirect(origin, code, reason) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", code);

  if (reason) {
    url.searchParams.set("reason", reason);
  }

  const response = NextResponse.redirect(url);

  return clearOAuthCookies(response);
}

export async function GET(request) {
  const origin = getAppOrigin(request);
  const params = request.nextUrl.searchParams;
  const error = params.get("error");

  if (error) {
    console.error(
      "DEVSTATIS GitHub OAuth error:",
      error,
      params.get("error_description") || ""
    );

    return loginRedirect(
      origin,
      error === "access_denied" ? "access_denied" : "oauth_failed",
      error === "access_denied" ? undefined : error
    );
  }

  const code = params.get("code");
  const state = params.get("state");
  const storedState = getOAuthState(request);

  if (!code || !state || !storedState || state !== storedState) {
    return loginRedirect(origin, "invalid_state", "invalid_state");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return loginRedirect(origin, "not_configured", "not_configured");
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: `${origin}/api/auth/github/callback`,
        }),
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      const exchangeError = new Error(
        tokenData.error_description ||
          tokenData.error ||
          "GitHub token exchange failed."
      );

      exchangeError.reason = tokenData.error || "token_exchange_failed";
      throw exchangeError;
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "DEVSTATIS",
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      const userError = new Error(
        `GitHub user request failed (${userResponse.status}).`
      );

      userError.reason = "user_fetch_failed";
      throw userError;
    }

    const user = await userResponse.json();

    if (!user?.login) {
      const profileError = new Error("GitHub did not return a user profile.");
      profileError.reason = "no_profile";
      throw profileError;
    }

    const next = safeNextPath(getOAuthNext(request));
    const sessionToken = createSessionToken(user);

    const response = NextResponse.redirect(new URL(next, origin));

    response.cookies.set(
      SESSION_COOKIE,
      sessionToken,
      sessionCookieOptions(request)
    );

    return clearOAuthCookies(response);
  } catch (caught) {
    console.error(
      "DEVSTATIS GitHub OAuth error:",
      caught.reason || "oauth_failed",
      caught.message || ""
    );

    return loginRedirect(
      origin,
      "oauth_failed",
      caught.reason || "oauth_failed"
    );
  }
}
