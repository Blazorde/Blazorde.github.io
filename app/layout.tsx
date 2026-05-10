import type { Metadata } from "next";
import "@shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Blaz - Portfolio front-end",
  description: "Portfolio front-end realise avec Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
