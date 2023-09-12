import { stat } from "fs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  const userLoading = useMemo(() => status === "loading", [status]);
  const userAuthenticated = useMemo(() => status === "authenticated", [status]);
  const notPublicRoutes = useMemo(() => {
    const publicRoutes = ["/login", "/signup"];
    if (publicRoutes.includes(router.pathname)) {
      return false;
    }
    return true;
  }, [router.pathname]);

  useEffect(() => {
    console.log({ userAuthenticated, notPublicRoutes });
    if (!userAuthenticated && notPublicRoutes) {
      router.replace("/login");
    }
  }, [notPublicRoutes, router, userAuthenticated]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return children;
}
