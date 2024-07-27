import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const title = "Hashnode: Everything you need to start blogging as a developer!";
const description =
  "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Hashnode",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, "min-h-screen")}>
        <Providers>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
