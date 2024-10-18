import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { sessionState } from "@/libs/states";
import { Item } from "@/types/item";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  setItems: (items: Item[]) => void;
}

export function PostModal({ isOpen, onClose, items, setItems }: Props) {
  const [session] = useRecoilState<Session | null>(sessionState);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePost() {
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/items";
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const data = { name: name, price: price };
      const res = await axios.post(url, data, config);
      if (res.status !== 200) {
        throw new Error("Failed to post item");
      }
      setItems([...items, res.data as Item]);
      toast({
        title: "Item added !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to add item",
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
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={name == ""}>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="item"
              />
            </FormControl>
            <FormControl mt={4} isInvalid={price == 0}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                value={price}
                onChange={(_, value) => setPrice(value)}
                step={10}
                min={0}
                max={1000000000}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePost}
              isDisabled={name == "" || price == 0}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
