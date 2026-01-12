"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCurrentRoute() {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(pathname || "");
  }, [pathname]);

  return currentRoute;
}
