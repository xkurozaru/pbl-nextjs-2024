import { Container, useColorMode } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Head from "next/head";
import supabase from "../libs/supabase";

export default function AuthPage() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>認証画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container h="100vh" alignContent="center">
        <Auth
          supabaseClient={supabase}
          socialLayout="horizontal"
          providers={["google", "github"]}
          appearance={{ theme: ThemeSupa }}
          theme={colorMode === "dark" ? "dark" : "light"}
        />
      </Container>
    </>
  );
}
