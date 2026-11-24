import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";
import { getAppOrigin } from "@/lib/app-url";

export const runtime = "nodejs";

function signOut(request) {
  const response = NextResponse.redirect(
    new URL("/", getAppOrigin(request)),
    { status: 303 }
  );

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function POST(request) {
  return signOut(request);
}

export async function GET(request) {
  return signOut(request);
}
