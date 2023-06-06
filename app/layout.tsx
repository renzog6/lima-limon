import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "@/style/globals.css";
import Providers from "./redux/Providers";

const inter = Inter({ subsets: ["latin"] });

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
    <html data-theme="lemonade" lang="es" className="h-full bg-gray-100">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
