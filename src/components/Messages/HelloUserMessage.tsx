import { Avatar, Heading } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import supabase from "@/libs/supabase";

export function HelloUserMessage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const sessionUpdate = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      }
      setSession(session);
    };

    sessionUpdate();
  }, []);

  return (
    <>
      <Avatar
        src={
          session?.user.user_metadata["picture"]
            ? session?.user.user_metadata["picture"]
            : session?.user.user_metadata["avatar_url"]
        }
      />
      <Heading fontSize="6xl" fontWeight="extrabold">
        Hello {session?.user.user_metadata["name"]} !!
      </Heading>
    </>
  );
}
