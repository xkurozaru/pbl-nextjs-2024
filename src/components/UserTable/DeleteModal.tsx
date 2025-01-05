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
import { Dispatch, SetStateAction, useState } from "react";

import UserApi from "@/apis/users";
import { User } from "@/types/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectUser: User;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export function DeleteModal({ isOpen, onClose, selectUser, setUsers }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await UserApi.deleteUser(selectUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectUser.id));
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
                Are you sure you want to delete <b>{selectUser.name}</b> ?
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
