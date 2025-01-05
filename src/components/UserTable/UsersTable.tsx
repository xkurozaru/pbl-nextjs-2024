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
import { useEffect, useState } from "react";

import UserApi from "@/apis/users";
import { User } from "@/types/user";
import { DeleteModal } from "./DeleteModal";
import { PostModal } from "./PostModal";

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const users = await UserApi.fetchUsers();
        setUsers(users);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
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
      {selectedUser && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          selectUser={selectedUser}
          setUsers={setUsers}
        />
      )}
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
                      onClick={() => onDeleteOpenWithUser(user)}
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
