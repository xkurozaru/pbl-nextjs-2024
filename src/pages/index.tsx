import { Center, Container, VStack } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { DisplayModeButton } from "../components/DisplayModeButton";
import { HelloMessage } from "../components/HelloMessage";
import { LoginLogoutButton } from "../components/LoginLogoutButton";
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
      <Container h="100vh" maxW="fit-content" alignContent="center">
        <Center>
          <VStack>
            <HelloMessage />
            <LoginLogoutButton />
            <DisplayModeButton />
          </VStack>
        </Center>
      </Container>
    </>
  );
}
