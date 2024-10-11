import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import supabase from "@/libs/supabase";

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sessionUpdate = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setIsReady(false);
        return;
      }
      if (session) {
        if (pathname === "/") {
          router.replace("/auth");
          return;
        }
        setIsReady(true);
        return;
      }
      if (pathname !== "/") {
        router.replace("/");
        return;
      }
      setIsReady(true);
      return;
    };

    sessionUpdate();
  }, [router, pathname, setIsReady]);

  if (!isReady) {
    return <></>;
  }
  return <>{children}</>;
};
