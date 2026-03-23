import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArticlesProvider } from "@/contexts/ArticlesContext";
import { AgentProvider } from "@/contexts/AgentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echo - AI News Assistant",
  description: "Your AI-powered news companion. Talk to get personalized news summaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AgentProvider>
          <ArticlesProvider>
            {children}
          </ArticlesProvider>
        </AgentProvider>
      </body>
    </html>
  );
}
