import { Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";

export function UserTableButton() {
  const router = useRouter();

  return (
    <Button
      colorScheme="blue"
      leftIcon={<Icon as={FaUser} />}
      onClick={() => router.push("/users")}
    >
      Users Table
    </Button>
  );
}
