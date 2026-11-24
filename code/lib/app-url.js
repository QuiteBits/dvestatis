export function getAppOrigin(request) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, "");

  if (configured && /^https?:\/\//i.test(configured)) {
    return configured;
  }

  return request.nextUrl.origin;
}
