import { Inter } from "next/font/google";
import Layout from "./components/Layout/Layout";
import "@/Style/globals.css";

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
    <html lang="es">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
