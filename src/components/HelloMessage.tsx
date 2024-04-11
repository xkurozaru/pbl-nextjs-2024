import { Heading } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";

export interface HelloMessageProps {
  session: Session | null;
}

export function HelloMessage({ session }: HelloMessageProps) {
  return (
    <>
      {session ? (
        <Heading>Hello {session.user.user_metadata["name"]} !!</Heading>
      ) : (
        <Heading>Hello Next App !!</Heading>
      )}
    </>
  );
}
