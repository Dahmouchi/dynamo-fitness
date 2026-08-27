import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DynamoFit Sale",
  description: "DynamoFit Sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "h-dvh",
        "overflow-hidden",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        bebas.variable,
        "font-sans",
      )}
    >
      <body className="h-dvh w-full overflow-hidden flex flex-col fixed inset-0">
        {children}
      </body>
    </html>
  );
}
