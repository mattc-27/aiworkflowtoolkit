import type { Metadata } from "next";
// apps/tools-next/app/layout.tsx
import Script from "next/script";
import { GA_ID } from "@/lib/gtag";
import GAListener from "./GAListener";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "AI Workflow Toolkit",
  description: "Fast utilities for prompt engineering & model costs.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SERVER COMPONENT – no "use client" here so metadata works
  return (
    <html lang="en">
      <body>
        {GA_ID ? (
          <>
            <Script
              id="ga-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `}
            </Script>
          </>
        ) : null}
        <GAListener />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
