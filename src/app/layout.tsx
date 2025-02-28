import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider, PostHogPageview } from "@/components/providers/posthog-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tailwind Snippets",
  description: "A collection of reusable Tailwind CSS snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <PostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <PostHogPageview />
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </PostHogProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
