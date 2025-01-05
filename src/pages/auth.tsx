import { Center, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";

import {
  DisplayModeButton,
  ItemTableButton,
  LogOutButton,
  UserTableButton,
} from "@/components/Buttons";
import { HelloUserMessage } from "@/components/Messages";

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
