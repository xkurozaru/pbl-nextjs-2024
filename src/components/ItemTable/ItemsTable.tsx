import { AddIcon, ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import ItemApi from "@/apis/items";
import { sessionState } from "@/libs/states";
import { Item } from "@/types/item";
import { DeleteModal } from "./DeleteModal";
import { PostModal } from "./PostModal";

export function ItemsTable() {
  const router = useRouter();
  const [session] = useRecoilState<Session | null>(sessionState);

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const items = await ItemApi.fetchItems(session?.access_token);
        setItems(items);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [session]);

  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  function onDeleteOpenWithItem(item: Item) {
    setSelectedItem(item);
    onDeleteOpen();
  }

  return (
    <>
      <PostModal
        isOpen={isPostOpen}
        onClose={onPostClose}
        items={items}
        setItems={setItems}
      />
      {selectedItem && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          selectItem={selectedItem}
          setItems={setItems}
        />
      )}
      <VStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.price}</Td>
                  <Td>
                    <IconButton
                      onClick={() => onDeleteOpenWithItem(item)}
                      variant="outline"
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Spinner size="xl" hidden={!isLoading} />
        <HStack>
          <IconButton
            onClick={() => router.push("/auth")}
            fontSize={"2xl"}
            variant={"outline"}
            aria-label={"Back"}
            icon={<ArrowBackIcon />}
            hidden={isLoading}
          />
          <IconButton
            onClick={onPostOpen}
            variant="outline"
            aria-label="Add"
            icon={<AddIcon />}
            hidden={isLoading}
          />
        </HStack>
      </VStack>
    </>
  );
}
