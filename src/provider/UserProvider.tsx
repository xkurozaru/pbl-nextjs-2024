import supabase from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "../libs/states";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [, setSession] = useRecoilState<Session | null>(sessionState);

  useEffect(() => {
    const userUpdate = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setIsReady(false);
        return;
      }
      setSession(session);
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

    userUpdate();
  }, [router, pathname, setIsReady, setSession]);

  if (!isReady) {
    return <></>;
  }
  return <>{children}</>;
};
