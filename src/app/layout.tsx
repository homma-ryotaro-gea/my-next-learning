import { Home } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <header className="h-12 border-b-[1px] flex items-center px-4 fixed top-0 left-0 w-full">
          <nav>
            <ul className="flex">
              <li>
                <Link href="/">
                  <Home />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <NuqsAdapter>
          <main className="max-w-[95%] mt-16 m-auto">{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
