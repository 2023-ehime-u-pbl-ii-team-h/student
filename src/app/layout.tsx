import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../theme/theme.css";
import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const inter = Inter({ subsets: ["latin"] });

const configuration: Configuration = {
  auth: {
    clientId: "788aebee-7aa0-4286-b58c-7e35bf22e92a",
  },
};

const pca = new PublicClientApplication(configuration);

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
      <body className={inter.className}>
        <MsalProvider instance={pca}>{children}</MsalProvider>
      </body>
    </html>
  );
}
