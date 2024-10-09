import { Center, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { UserTableButton } from "@/components/Buttons/UserTableButton";
import { AuthButton } from "../components/AuthButton/AuthButton";
import { DisplayModeButton } from "../components/Buttons/DisplayModeButton";
import { HelloMessage } from "../components/Message/HelloMessage";

export default function Home() {
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
          <HStack>
            <DisplayModeButton />
            <UserTableButton />
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
