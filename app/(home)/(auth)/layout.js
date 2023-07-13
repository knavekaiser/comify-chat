"use client";

import { SiteContext } from "@/app/context";
import paths from "@/utils/paths";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function RootLayout({ children }) {
  const { user } = useContext(SiteContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(paths.topics);
    }
  }, []);
  return <>{children}</>;
}
