"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type KV = { key: string; value: string };

function getAllLocalStorage(): KV[] {
  return Object.entries(localStorage).map(([key, value]) => ({ key, value }));
}

function getAllSessionStorage(): KV[] {
  return Object.entries(sessionStorage).map(([key, value]) => ({ key, value }));
}

function getAllCookies(): KV[] {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .map((str) => {
      const [key, ...rest] = str.split("=");
      return { key, value: rest.join("=") };
    });
}

export default function StorageInspector() {
  const [localItems, setLocalItems] = useState<KV[]>([]);
  const [sessionItems, setSessionItems] = useState<KV[]>([]);
  const [cookieItems, setCookieItems] = useState<KV[]>([]);
  const [update, setUpdate] = useState(0); // Used to force rerender

  // For adding new items
  const [newLocal, setNewLocal] = useState<KV>({ key: "", value: "" });
  const [newSession, setNewSession] = useState<KV>({ key: "", value: "" });
  const [newCookie, setNewCookie] = useState<KV>({ key: "", value: "" });

  // Load storage on mount and update
  useEffect(() => {
    setLocalItems(getAllLocalStorage());
    setSessionItems(getAllSessionStorage());
    setCookieItems(getAllCookies());
  }, [update]);

  // Helper functions
  const handleAdd = (type: "local" | "session" | "cookie") => {
    if (type === "local" && newLocal.key) {
      localStorage.setItem(newLocal.key, newLocal.value);
      setNewLocal({ key: "", value: "" });
    }
    if (type === "session" && newSession.key) {
      sessionStorage.setItem(newSession.key, newSession.value);
      setNewSession({ key: "", value: "" });
    }
    if (type === "cookie" && newCookie.key) {
      document.cookie = `${newCookie.key}=${newCookie.value}; path=/`;
      setNewCookie({ key: "", value: "" });
    }
    setUpdate((n) => n + 1);
  };

  const handleRemove = (type: "local" | "session" | "cookie", key: string) => {
    if (type === "local") localStorage.removeItem(key);
    if (type === "session") sessionStorage.removeItem(key);
    if (type === "cookie")
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUpdate((n) => n + 1);
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Local Storage */}
          <Card className="rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/80">
            <CardHeader>
              <CardTitle>localStorage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Key"
                    value={newLocal.key}
                    onChange={(e) =>
                      setNewLocal((kv) => ({ ...kv, key: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Input
                    placeholder="Value"
                    value={newLocal.value}
                    onChange={(e) =>
                      setNewLocal((kv) => ({ ...kv, value: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Button onClick={() => handleAdd("local")}>Add</Button>
                </div>
                <div className="space-y-1">
                  {localItems.length === 0 && (
                    <span className="text-gray-400 text-sm">No items</span>
                  )}
                  {localItems.map(({ key, value }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                    >
                      <span className="truncate max-w-[100px] font-mono">
                        {key}
                      </span>
                      <span className="truncate max-w-[120px] text-xs text-gray-700 dark:text-gray-300 ml-2">
                        {value}
                      </span>
                      <Button
                        size="sm"
                        className="ml-2"
                        onClick={() => handleRemove("local", key)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Session Storage */}
          <Card className="rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/80">
            <CardHeader>
              <CardTitle>sessionStorage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Key"
                    value={newSession.key}
                    onChange={(e) =>
                      setNewSession((kv) => ({ ...kv, key: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Input
                    placeholder="Value"
                    value={newSession.value}
                    onChange={(e) =>
                      setNewSession((kv) => ({ ...kv, value: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Button onClick={() => handleAdd("session")}>Add</Button>
                </div>
                <div className="space-y-1">
                  {sessionItems.length === 0 && (
                    <span className="text-gray-400 text-sm">No items</span>
                  )}
                  {sessionItems.map(({ key, value }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                    >
                      <span className="truncate max-w-[100px] font-mono">
                        {key}
                      </span>
                      <span className="truncate max-w-[120px] text-xs text-gray-700 dark:text-gray-300 ml-2">
                        {value}
                      </span>
                      <Button
                        size="sm"
                        className="ml-2"
                        onClick={() => handleRemove("session", key)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Cookies */}
          <Card className="rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/80">
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Key"
                    value={newCookie.key}
                    onChange={(e) =>
                      setNewCookie((kv) => ({ ...kv, key: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Input
                    placeholder="Value"
                    value={newCookie.value}
                    onChange={(e) =>
                      setNewCookie((kv) => ({ ...kv, value: e.target.value }))
                    }
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  />
                  <Button onClick={() => handleAdd("cookie")}>Add</Button>
                </div>
                <div className="space-y-1">
                  {cookieItems.length === 0 && (
                    <span className="text-gray-400 text-sm">No items</span>
                  )}
                  {cookieItems.map(({ key, value }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                    >
                      <span className="truncate max-w-[100px] font-mono">
                        {key}
                      </span>
                      <span className="truncate max-w-[120px] text-xs text-gray-700 dark:text-gray-300 ml-2">
                        {value}
                      </span>
                      <Button
                        size="sm"
                        className="ml-2"
                        onClick={() => handleRemove("cookie", key)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
