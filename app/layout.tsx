import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const fonts = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Message app",
  description: "For University of Nagoya students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={fonts.className}>{children}</body>
    </html>
  );
}
