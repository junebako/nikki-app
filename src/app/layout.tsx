import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getEnvPrefix(): string {
  if (process.env.VERCEL_ENV === "production") return "";
  if (process.env.VERCEL_ENV === "preview") return "[Preview] ";
  if (process.env.NODE_ENV === "production") return "";
  return "[Dev] ";
}

const envPrefix = getEnvPrefix();

export const metadata: Metadata = {
  title: {
    template: `${envPrefix}%s | Nikki`,
    default: `${envPrefix}Nikki`,
  },
  description: "小さく書き溜めて、日にひとつずつ公開する日記アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
