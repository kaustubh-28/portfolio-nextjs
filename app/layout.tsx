import type { Metadata } from "next";
import "./globals.css";
import { metaData } from "@/data/meta";
import BackgroundGrid from "@/components/ui/BackgroundGrid";
import { sora, spaceGrotesk, jetbrainsMono } from "./fonts";

export const metadata: Metadata = {
  title: metaData.name,
  description: metaData.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sora.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <BackgroundGrid />
        {children}
      </body>
    </html>
  );
}
