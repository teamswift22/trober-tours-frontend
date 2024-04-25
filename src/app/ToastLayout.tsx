"use client";

import { Toaster } from "@/components/ui/toaster";

const ToastLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToastLayout;
