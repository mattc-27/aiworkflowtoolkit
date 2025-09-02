import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
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

        {/* Wrap GAListener in Suspense to avoid CSR bailout if it uses router hooks */}
        <Suspense fallback={null}>
          <GAListener />
        </Suspense>

        <Suspense
          fallback={
            <main className="container main">
              <p>Loading…</p>
            </main>
          }
        >
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
