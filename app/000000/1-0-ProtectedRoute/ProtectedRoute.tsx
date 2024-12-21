"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../1-0-UserContext/UserContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/000001/login"); // Redirect to the login page if not logged in
    }
  }, [user, router]);

  // Render nothing until the redirect logic completes
  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
