import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thinkronix - Electronics Hackathon",
  description:
    "Join Thinkronix, the premier electronics hackathon at Central University of Rajasthan. Build innovative solutions and win exciting prizes!",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
