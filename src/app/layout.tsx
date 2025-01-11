import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "./providers";
import { Footer } from "@/components";
import { CannotCopy } from "@/components/cannot-copy";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Trilingual translator",
  description: "Translate text quickly and accurately",
  openGraph: {
    title: "Trilingual translator",
    description: "Translate text quickly and accurately",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trilingual translator preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trilingual translator",
    description: "Translate text quickly and accurately",
    images: ["/og-image.jpg"],
  },
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
          <Box p={5}>
            {children}
            <CannotCopy />
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
