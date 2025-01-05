import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { DisplayModeButton, LogInButton } from "@/components/Buttons";
import { HelloNextMessage } from "@/components/Messages";

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
