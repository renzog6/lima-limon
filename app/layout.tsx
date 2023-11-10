//@/app/layout.tsx
import { Figtree } from "next/font/google";
import { Suspense } from "react";
import Layout from "@/components/ui/Layout";
import Loading from "./loading";
import "@/style/globals.css";

const font = Figtree({
  subsets: ["latin"],
});

export const metadata = {
  title: "Lima Limon App",
  description: "App by renzog6",
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon-16x16.png",
    apple: "apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={font.className}>
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
