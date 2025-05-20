import { NextRequest, NextResponse } from "next/server";

// Handles GET, POST, PUT, DELETE, etc.
export async function GET(req: NextRequest) {
  return proxyRequest(req, "GET");
}
export async function POST(req: NextRequest) {
  return proxyRequest(req, "POST");
}
export async function PUT(req: NextRequest) {
  return proxyRequest(req, "PUT");
}
export async function DELETE(req: NextRequest) {
  return proxyRequest(req, "DELETE");
}

async function proxyRequest(req: NextRequest, method: string) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    let fetchOptions: RequestInit = { method };

    // Forward body for non-GET requests
    if (method !== "GET") {
      const contentType = req.headers.get("content-type");
      const body = await req.text();
      fetchOptions = {
        ...fetchOptions,
        headers: contentType ? { "content-type": contentType } : undefined,
        body,
      };
    }

    // Forward the request to the actual target
    const fetchRes = await fetch(url, fetchOptions);

    // Copy status, headers, and body
    const resContentType = fetchRes.headers.get("content-type") || "text/plain";
    const resBody = await fetchRes.text();

    return new NextResponse(resBody, {
      status: fetchRes.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": resContentType,
      },
    });
  } catch (error: unknown) {
    let message = "Proxy error";
    if (typeof error === "object" && error !== null && "message" in error) {
      message = String((error as { message?: unknown }).message);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
