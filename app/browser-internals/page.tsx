"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { JSX, useEffect, useState } from "react";
import { BROWSER_INTERNALS_SECTIONS } from "@/lib/browserInternalsSections";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function shuffleArray(
  arr: { key: string; title: string; content: JSX.Element }[]
) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const PAGE_SIZE = 15;

export default function BrowserInternals() {
  const [sections, setSections] = useState(BROWSER_INTERNALS_SECTIONS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setSections(shuffleArray(BROWSER_INTERNALS_SECTIONS));
  }, []);

  const handleLoadMore = () =>
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, sections.length));

  return (
    <main className="p-4 sm:p-8 max-w-2xl mx-auto space-y-4 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight text-primary dark:text-primary-300 drop-shadow">
        🧩 Browser Internals
      </h1>
      {sections.slice(0, visibleCount).map((section) => (
        <Card
          key={section.key}
          className={`mb-5 shadow-xl border transition-all rounded-2xl overflow-hidden ${
            open === section.key
              ? "border-primary/80 bg-primary/5 dark:bg-primary/10"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900"
          }`}
        >
          <CardHeader
            className={`cursor-pointer select-none transition-all py-4 px-6 
            ${open === section.key
              ? "bg-primary/10 dark:bg-primary/20"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setOpen(open === section.key ? null : section.key)}
          >
            <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight">
              <span>{section.title}</span>
              <span className="ml-4 text-2xl font-light opacity-80">
                {open === section.key ? "−" : "+"}
              </span>
            </CardTitle>
          </CardHeader>
          {open === section.key && (
            <CardContent className="px-6 py-4 text-base leading-relaxed space-y-3 text-gray-900 dark:text-gray-200">
              {section.content}
            </CardContent>
          )}
        </Card>
      ))}
      {visibleCount < sections.length && (
        <button
          className="mx-auto mt-6 rounded-full bg-primary text-white px-8 py-3 font-bold text-lg shadow-lg hover:bg-primary/90 transition block focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
      {visibleCount >= sections.length && (
        <div className="mx-auto mt-8 text-gray-500 text-base text-center font-semibold">
          All topics loaded!
        </div>
      )}
      <div className="text-base text-gray-500 mt-12 text-center">
        Want to dive deeper? Try the <b>API Playground</b>, <b>CORS Simulator</b>, and future labs from the homepage.
      </div>
    </main>
  );
}
