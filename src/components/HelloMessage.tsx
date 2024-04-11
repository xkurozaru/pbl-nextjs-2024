import { Heading } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";

export interface HelloMessageProps {
  session: Session | null;
}

export function HelloMessage({ session }: HelloMessageProps) {
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
