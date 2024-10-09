import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { LogInButton } from "@/components/Buttons/LogInButton";
import { DisplayModeButton } from "../components/Buttons/DisplayModeButton";
import { HelloNextMessage } from "../components/Messages/HelloNextMessage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <HelloNextMessage />
          <LogInButton />
          <DisplayModeButton />
        </VStack>
      </Center>
    </>
  );
}
