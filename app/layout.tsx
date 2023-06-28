//@/app/layout.tsx
import { Inter, Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
import Layout from "@/components/ui/Layout";
import Loading from "./loading";
import "@/style/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Lima Limon App",
  description: "App by renzog6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      data-theme="lemonade"
      lang="es"
      className={`${inter.variable} ${roboto_mono.variable}`}
    >
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
