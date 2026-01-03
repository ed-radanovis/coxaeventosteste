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
  const [showDialog, setShowDialog] = useState(false);
  const [checkedAccess, setCheckedAccess] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (requireLogin && !user) {
      router.push("/sign-in");
      return;
    }

    if (user) {
      const role = user.publicMetadata?.role as string | undefined;

      if (role !== "admin") {
        setShowDialog(true);
        setCheckedAccess(true);
      } else {
        setCheckedAccess(true);
      }
    }

    setCheckedAccess(true);
  }, [user, isLoaded, requireLogin, router]);

  if (showDialog && user) {
    const role = user.publicMetadata?.role as string | undefined;
    return (
      <>
        <Loading />
        <AccessDeniedDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          userRole={role}
        />
      </>
    );
  }

  if (checkedAccess && !showDialog) {
    return null;
  }

  return <Loading />;
}
