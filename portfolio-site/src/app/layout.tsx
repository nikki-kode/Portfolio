import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikki Kode",
  description: "Software engineer · UX designer · UX researcher",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
