import { Heading } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useRecoilState } from "recoil";
import { sessionState } from "../libs/states";

export function HelloMessage() {
  const [session, setSession] = useRecoilState<Session | null>(sessionState);

  return (
    <>
      {session ? (
        <Heading fontSize="6xl" fontWeight="extrabold">
          Hello {session.user.user_metadata["name"]} !!
        </Heading>
      ) : (
        <Heading fontSize="6xl" fontWeight="extrabold">
          Hello Next App !!
        </Heading>
      )}
    </>
  );
}
