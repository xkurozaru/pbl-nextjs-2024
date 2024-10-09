import { Button, useDisclosure } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { sessionState } from "../../libs/states";
import supabase from "../../libs/supabase";
import { AuthModal } from "./AuthModal";

export function AuthButton() {
  const [session] = useRecoilState<Session | null>(sessionState);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session) {
    return (
      <>
        <Button
          w="100%"
          colorScheme="red"
          onClick={() => {
            supabase.auth.signOut();
            router.push("/");
          }}
        >
          Log Out
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          w="100%"
          colorScheme="blue"
          onClick={() => {
            onOpen();
          }}
        >
          Log In
        </Button>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
}
