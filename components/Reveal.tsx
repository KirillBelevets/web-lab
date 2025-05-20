"use client";

import { useState } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`block text-xs mt-1 italic cursor-pointer transition-all select-none ${
        revealed
          ? "blur-0 text-gray-800 dark:text-gray-200"
          : "blur-sm text-gray-400 hover:blur-0 hover:text-gray-700 dark:hover:text-gray-300"
      }`}
      title={revealed ? "" : "Click to reveal answer"}
      onClick={() => setRevealed(true)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setRevealed(true);
      }}
      role="button"
      aria-pressed={revealed}
    >
      {children}
      {!revealed && (
        <span className="ml-2 text-gray-300 dark:text-gray-500">
          (click to reveal)
        </span>
      )}
    </span>
  );
}
