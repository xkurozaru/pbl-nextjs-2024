import { Center, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container h="100vh" alignContent="center">
        <Center>
          <Heading> Hello Next App!</Heading>
        </Center>
      </Container>
    </>
  );
}
