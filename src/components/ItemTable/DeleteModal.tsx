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
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { useRecoilState } from "recoil";

import ItemApi from "@/apis/items";
import { sessionState } from "@/libs/states";
import { Item } from "@/types/item";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectItem: Item;
  setItems: Dispatch<SetStateAction<Item[]>>;
}

export function DeleteModal({ isOpen, onClose, selectItem, setItems }: Props) {
  const [session] = useRecoilState<Session | null>(sessionState);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await ItemApi.deleteItem(session?.access_token, selectItem.id);
      setItems((prev) => prev.filter((i) => i.id !== selectItem.id));
      toast({
        title: "Item deleted !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to delete item",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={1}>
              <Text>
                Are you sure you want to delete <b>{selectItem.name}</b> ?
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
