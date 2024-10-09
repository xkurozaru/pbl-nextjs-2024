import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AuthModal } from "../AuthModal/AuthModal";

export function LogInButton() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        w="100%"
        colorScheme="blue"
        onClick={() => {
          onOpen();
        }}
      >
        Log In
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
