"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import { AccessDeniedDialog } from "@/components/access-denied-dialog";

interface AdminAccessGuardProps {
  requireLogin?: boolean;
}

export function AdminAccessGuard({
  requireLogin = false,
}: AdminAccessGuardProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checkedAccess, setCheckedAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (requireLogin && !user) {
      router.push("/sign-in");
      return;
    }

    if (user) {
      const role = user.publicMetadata?.role as string | undefined;
      const userIsAdmin = role === "admin";

      setIsAdmin(userIsAdmin);
      setCheckedAccess(true);
    } else {
      setCheckedAccess(true);
    }
  }, [user, isLoaded, requireLogin, router]);

  // if not admin => block with forceAction
  if (isAdmin === false) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm">
        <AccessDeniedDialog
          open={true}
          onOpenChange={(open) => {
            // attempt to close, force redirection
            if (!open) {
              router.push("/");
            }
          }}
          userRole={user?.publicMetadata?.role as string | undefined}
          forceAction={true}
        />
      </div>
    );
  }

  if (!checkedAccess) {
    return <Loading />;
  }

  // if admin → allows access
  return null;
}
