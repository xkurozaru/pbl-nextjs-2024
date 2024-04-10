import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex align="center" justify="center">
        <Heading>Hello Next App!</Heading>
      </Flex>
    </>
  );
}
