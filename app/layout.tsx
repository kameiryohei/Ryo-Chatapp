import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

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
      <body className={fonts.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
