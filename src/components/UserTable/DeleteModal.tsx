import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import { User } from "@/types/user";

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

export function DeleteModal({ user, isOpen, onClose, users, setUsers }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/users/" + user.id;
      const res = await axios.delete(url);
      if (res.status !== 200) {
        throw new Error("Failed to delete user");
      }
      const newUsers = users.filter((u) => u.id !== user.id);
      setUsers(newUsers);
      toast({
        title: "User deleted !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to delete user",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={1}>
              <Text>
                Are you sure you want to delete <b>{user.name}</b> ?
              </Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
