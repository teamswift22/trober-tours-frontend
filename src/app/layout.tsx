import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import ToastLayout from "./ToastLayout";
import RequireAuth from "@/components/RequireAuth";

const sora = Sora({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trober Tour",
  description: "Manage your tours seemlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.className}>
      <body>
        <StoreProvider>
          <RequireAuth>
            <ToastLayout>{children}</ToastLayout>
          </RequireAuth>
        </StoreProvider>
      </body>
    </html>
  );
}
