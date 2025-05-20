import { NextRequest, NextResponse } from "next/server";

// Handles GET, POST, OPTIONS (for preflight)
export async function OPTIONS(req: NextRequest) {
  return handleCORS(req, true);
}
export async function GET(req: NextRequest) {
  return handleCORS(req, false);
}
export async function POST(req: NextRequest) {
  return handleCORS(req, false);
}

function handleCORS(req: NextRequest, isPreflight: boolean) {
  const params = req.nextUrl.searchParams;

  const allowOrigin = params.get("allowOrigin") ?? "*";
  const allowMethods = params.get("allowMethods") ?? "GET,POST,OPTIONS";
  const allowHeaders = params.get("allowHeaders") ?? "Content-Type";
  const allowCredentials = params.get("allowCredentials") === "true";

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": allowMethods,
    "Access-Control-Allow-Headers": allowHeaders,
  };
  if (allowCredentials) headers["Access-Control-Allow-Credentials"] = "true";

  if (isPreflight) {
    // Preflight (OPTIONS) returns no content, only headers
    return new NextResponse(null, { status: 204, headers });
  }
  // Normal request returns JSON with headers set
  return NextResponse.json(
    { message: "Pretend CORS server response!" },
    { status: 200, headers }
  );
}
