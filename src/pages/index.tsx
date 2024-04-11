import { Center, Container, VStack } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HelloMessage } from "../components/HelloMessage";
import { LoginLogoutButton } from "../components/LoginLogoutButton";
import supabase from "../libs/supabase";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await supabase.auth.getSession();
      const data = await response.data;
      setSession(data.session);
    };

    fetchSession();
  }, []);

  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container h="100vh" alignContent="center">
        <Center>
          <VStack>
            <HelloMessage session={session} />
            <LoginLogoutButton session={session} setSession={setSession} />
          </VStack>
        </Center>
      </Container>
    </>
  );
}
