import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="pt-10">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
