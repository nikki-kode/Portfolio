import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikki Kode",
  description: "Software Engineer · UX Designer/Researcher · Musician",
  metadataBase: new URL("https://nikkikode.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
