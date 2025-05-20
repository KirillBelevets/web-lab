import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function HomePage() {
  const features = [
    {
      title: "API Playground",
      path: "/api-playground",
      description:
        "Send and inspect HTTP requests with headers, body, and auth.",
    },
    {
      title: "Storage Inspector",
      path: "/storage-inspector",
      description:
        "View, edit, and clear localStorage, sessionStorage, and cookies.",
    },
    {
      title: "CORS Simulator",
      path: "/cors-simulator",
      description:
        "Test cross-origin requests and learn how CORS headers work.",
    },
    {
      title: "Browser Internals",
      path: "/browser-internals",
      description: "Understand browser events, lifecycle, cache, and more.",
    },
  ];

  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8">
        🌐 Web Lab
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Link key={feature.path} href={feature.path} className="group">
            <Card className="h-full rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 shadow-2xl group-hover:shadow-3xl group-hover:scale-[1.025] transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-300 mb-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-block text-sm font-medium text-gray-500 group-hover:text-indigo-500 transition-colors">
                  Click to explore &rarr;
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
