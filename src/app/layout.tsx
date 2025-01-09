import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./providers";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "Trilingual translator",
  description: "Trilingual translator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Header />
        </Providers>
      </body>
    </html>
  );
}
