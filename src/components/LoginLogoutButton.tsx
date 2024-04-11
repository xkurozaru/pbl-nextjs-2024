import { Button } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import supabase from "../libs/supabase";

export interface LoginLogoutButtonProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export function LoginLogoutButton({
  session,
  setSession,
}: LoginLogoutButtonProps) {
  const router = useRouter();

  if (session) {
    return (
      <Button
        w="100%"
        colorScheme="red"
        onClick={() => {
          supabase.auth.signOut();
          setSession(null);
          router.push("/");
        }}
      >
        LogOut
      </Button>
    );
  } else {
    return (
      <Button
        w="100%"
        colorScheme="blue"
        onClick={() => {
          router.push("/auth");
        }}
      >
        LogIn
      </Button>
    );
  }
}
