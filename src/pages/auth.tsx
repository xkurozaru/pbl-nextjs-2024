import { Center, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { UserTableButton } from "@/components/Buttons/UserTableButton";
import { DisplayModeButton } from "../components/Buttons/DisplayModeButton";
import { LogOutButton } from "../components/Buttons/LogOutButton";
import { HelloUserMessage } from "../components/Messages/HelloUserMessage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <HelloUserMessage />
          <LogOutButton />
          <HStack>
            <DisplayModeButton />
            <UserTableButton />
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
