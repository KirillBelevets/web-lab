"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CorsSimulator() {
  const [method, setMethod] = useState("GET");
  const [allowOrigin, setAllowOrigin] = useState("*");
  const [allowCredentials, setAllowCredentials] = useState(false);
  const [allowMethods, setAllowMethods] = useState("GET,POST,OPTIONS");
  const [allowHeaders, setAllowHeaders] = useState("Content-Type");
  const [result, setResult] = useState<string | null>(null);

  const runSimulation = async () => {
    setResult(null);
    const url = `/api/mock-cors?allowOrigin=${encodeURIComponent(
      allowOrigin
    )}&allowCredentials=${allowCredentials}&allowMethods=${encodeURIComponent(
      allowMethods
    )}&allowHeaders=${encodeURIComponent(allowHeaders)}`;

    try {
      let res: Response;
      if (method === "OPTIONS") {
        res = await fetch(url, { method: "OPTIONS" });
        setResult(
          [
            `Status: ${res.status} (Preflight)`,
            ...[
              "access-control-allow-origin",
              "access-control-allow-credentials",
              "access-control-allow-methods",
              "access-control-allow-headers",
            ].map((h) => `${h}: ${res.headers.get(h) || "(not present)"}`),
          ].join("\n")
        );
      } else {
        res = await fetch(url, { method });
        const body = await res.text();
        setResult(
          [
            `Status: ${res.status}`,
            ...[
              "access-control-allow-origin",
              "access-control-allow-credentials",
              "access-control-allow-methods",
              "access-control-allow-headers",
            ].map((h) => `${h}: ${res.headers.get(h) || "(not present)"}`),
            "",
            "Response body:",
            body,
          ].join("\n")
        );
      }
    } catch (e: unknown) {
      let message = "Unknown error";
      if (typeof e === "object" && e !== null && "message" in e) {
        message = String((e as { message?: unknown }).message);
      } else {
        message = String(e);
      }
      setResult("Error: " + message);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center tracking-tight">
            Pretend CORS Server Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border-2 border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-black/70 w-32 shadow focus:ring-2 focus:ring-indigo-300"
            >
              <option>GET</option>
              <option>POST</option>
              <option>OPTIONS</option>
            </select>
            <Input
              className="flex-1 bg-gray-50 dark:bg-gray-800/60 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow focus:ring-2 focus:ring-indigo-200"
              value={allowOrigin}
              onChange={(e) => setAllowOrigin(e.target.value)}
              placeholder='Access-Control-Allow-Origin (e.g. "*", "http://localhost:3000")'
            />
          </div>
          <div className="flex gap-2">
            <Input
              value={allowMethods}
              onChange={(e) => setAllowMethods(e.target.value)}
              placeholder="Allow Methods"
              className="bg-gray-50 dark:bg-gray-800/60 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow"
            />
            <Input
              value={allowHeaders}
              onChange={(e) => setAllowHeaders(e.target.value)}
              placeholder="Allow Headers"
              className="bg-gray-50 dark:bg-gray-800/60 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={allowCredentials}
              onChange={(e) => setAllowCredentials(e.target.checked)}
              className="accent-indigo-600"
            />
            Allow Credentials (
            <span className="font-mono">Access-Control-Allow-Credentials</span>)
          </label>
          <Button onClick={runSimulation} className="w-full">
            Simulate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/95 dark:bg-gray-900/90">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Simulation Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs whitespace-pre-wrap bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-100 dark:border-gray-800 mb-3 overflow-x-auto">
              {result}
            </pre>
            {method !== "OPTIONS" &&
              allowOrigin === "*" &&
              allowCredentials && (
                <div className="mt-2 bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-xs font-semibold px-4 py-2 rounded shadow">
                  🚫 <b>Warning:</b> Browsers will block requests with{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    Access-Control-Allow-Origin: *
                  </code>{" "}
                  <b>and</b>{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    Access-Control-Allow-Credentials: true
                  </code>
                  !
                  <br />
                  Use a specific origin when credentials are required.
                </div>
              )}
            <div className="mt-4 text-gray-500 text-xs bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 px-4 py-2 rounded shadow">
              <b>Tip:</b> Try switching between{" "}
              <code className="bg-gray-200 px-1 rounded">* </code> and an exact
              origin, and toggle{" "}
              <span className="italic">Allow Credentials</span> to see browser
              rules in action.
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
