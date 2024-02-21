import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./(site)/components/ActiveStatus";

const fonts = Noto_Sans_JP({ subsets: ["latin"], weight: "500" });
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
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
