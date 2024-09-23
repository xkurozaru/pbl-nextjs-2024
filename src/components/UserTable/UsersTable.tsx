import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
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

import axios from "axios";
import { useEffect, useState } from "react";

import { User } from "../../types/user";
import DeleteModal from "./DeleteModal";
import PostModal from "./PostModal";

export default function UsersTable() {
  const [users, setUsers] = useState([] as User[]);
  const [selectedUser, setSelectedUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  async function handleGet() {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/users";
      const res = await axios.get(url);
      if (res.status !== 200) {
        throw new Error("Failed to fetch users");
      }
      setUsers(res.data as User[]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const init = async () => {
      await handleGet();
      setIsLoading(false);
    };
    init();
  }, []);

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

  function onDeleteOpenWithUser(user: User) {
    setSelectedUser(user);
    onDeleteOpen();
  }

  return (
    <>
      <PostModal
        isOpen={isPostOpen}
        onClose={onPostClose}
        users={users}
        setUsers={setUsers}
      />
      <DeleteModal
        user={selectedUser}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        users={users}
        setUsers={setUsers}
      />
      <VStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Grade</Th>
                <Th>Team</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.grade}</Td>
                  <Td>{user.team}</Td>
                  <Td>
                    <IconButton
                      onClick={onDeleteOpenWithUser.bind(null, user)}
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
        <IconButton
          onClick={onPostOpen}
          variant="outline"
          aria-label="Add"
          icon={<AddIcon />}
          hidden={isLoading}
        />
      </VStack>
    </>
  );
}
