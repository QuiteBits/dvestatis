import { NextResponse } from "next/server";
import {
  createOAuthState,
  setOAuthCookies,
} from "@/lib/session";
import { safeNextPath } from "@/lib/redirect";
import { getAppOrigin } from "@/lib/app-url";

export const runtime = "nodejs";

export async function GET(request) {
  const origin = getAppOrigin(request);
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/login?error=not_configured", origin)
    );
  }

  const state = createOAuthState();
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));

  const authorizeUrl = new URL(
    "https://github.com/login/oauth/authorize"
  );

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set(
    "redirect_uri",
    `${origin}/api/auth/github/callback`
  );
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);

  return setOAuthCookies(response, request, state, next);
}
