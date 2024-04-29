"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const RequireAuth = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const persistedData = localStorage.getItem("persistedData");
    const userSession = persistedData ? JSON.parse(persistedData) : false;

    const isProtectedRoute = !(
      pathName.includes("login") ||
      pathName.includes("signup") ||
      pathName.includes("waitlist") ||
      pathName === "/"
    );

    if (!userSession && isProtectedRoute) {
      router.replace("/login");
    }
    if (userSession && !isProtectedRoute) {
      router.replace("home");
    }
  }, []);

  return <>{children}</>;
};

export default RequireAuth;
