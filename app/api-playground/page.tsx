"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApiPlayground() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [time, setTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    setStatus(null);
    setTime(null);
    setHeaders({});
    setResponse(null);

    const start = Date.now();
    try {
      let fetchUrl = url;
      // For GET, route through proxy to avoid CORS
      if (method === "GET") {
        fetchUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
      }
      const res = await fetch(fetchUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method !== "GET" ? body : undefined,
      });
      const duration = Date.now() - start;
      setStatus(res.status);
      setTime(duration);

      // Collect headers
      const hdrs: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        hdrs[key] = value;
      });
      setHeaders(hdrs);

      // Try to pretty print JSON if possible
      let text = await res.text();
      try {
        const json = JSON.parse(text);
        text = JSON.stringify(json, null, 2);
      } catch {}
      setResponse(text);
    } catch (error: unknown) {
      let message = "Unknown error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = String((error as { message?: unknown }).message);
      } else {
        message = String(error);
      }
      setResponse(`Error: ${message}`);
    }

    setLoading(false);
  };

  return (
    <main className="p-8 space-y-6 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/80 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>API Playground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-white dark:bg-gray-900/70 rounded-b-xl">
          {/* URL input on its own row */}
          <Input
            className="w-full"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Method select and send button side by side */}
          <div className="flex gap-3 items-center">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger
                className="w-32 h-12 rounded-xl"
                aria-label="HTTP method"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleSendRequest}
              disabled={loading || !url}
              className="h-12 px-8 rounded-xl text-base font-semibold border border-gray-200 dark:border-gray-700 bg-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center"
              style={{ minWidth: 180 }}
            >
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </div>

          {/* Optional body field for POST/PUT/DELETE */}
          {method !== "GET" && (
            <Textarea
              placeholder="Request Body (JSON)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>

      {status !== null && (
        <div className="flex items-center gap-4 mt-2">
          <span className="font-mono text-sm">
            Status:{" "}
            <span
              className={
                status >= 200 && status < 300
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {status}
            </span>
          </span>
          {time !== null && (
            <span className="font-mono text-sm text-gray-500">
              Time: {time}ms
            </span>
          )}
        </div>
      )}

      {Object.keys(headers).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Response Headers</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-xs">
              {Object.entries(headers)
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n")}
            </pre>
          </CardContent>
        </Card>
      )}

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response Body</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-black/80 text-white p-4 rounded-md">
              {response}
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
