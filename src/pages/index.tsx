import { Center, VStack } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { AuthButton } from "../components/AuthButton/AuthButton";
import { DisplayModeButton } from "../components/DisplayModeButton/DisplayModeButton";
import { HelloMessage } from "../components/Message/HelloMessage";
import { sessionState } from "../libs/states";
import supabase from "../libs/supabase";

export default function Home() {
  const [session, setSession] = useRecoilState<Session | null>(sessionState);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();
  }, [setSession]);

  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <HelloMessage />
          <AuthButton />
          <DisplayModeButton />
        </VStack>
      </Center>
    </>
  );
}
