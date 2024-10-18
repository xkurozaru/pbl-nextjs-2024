import { Center, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { DisplayModeButton } from "@/components/Buttons/DisplayModeButton";
import { ItemTableButton } from "@/components/Buttons/ItemTableButton";
import { LogOutButton } from "@/components/Buttons/LogOutButton";
import { UserTableButton } from "@/components/Buttons/UserTableButton";
import { HelloUserMessage } from "@/components/Messages/HelloUserMessage";

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
            <ItemTableButton />
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
