import ClientLayout from "@/components/ClientLayout";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
