import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../theme/theme.css";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "出席確認システム - 学生用",
  description: "講義ごとに出席を申告し、自身の出席状況を確認しましょう。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`background on-background-text ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
