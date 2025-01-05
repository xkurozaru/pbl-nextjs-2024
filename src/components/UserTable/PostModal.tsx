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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import UserApi from "@/apis/users";
import { User } from "@/types/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

export function PostModal({ isOpen, onClose, users, setUsers }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [grade, setGrade] = useState(3);
  const [team, setTeam] = useState("Not Assigned");

  async function handlePost() {
    setIsLoading(true);
    try {
      const user = await UserApi.createUser(name, grade, team);
      setUsers([...users, user]);

      toast({
        title: "User added !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to add user",
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
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={name == ""}>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="user"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Grade</FormLabel>
              <NumberInput
                value={grade}
                onChange={(_, value) => setGrade(value)}
                step={1}
                min={1}
                max={9}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Team</FormLabel>
              <Select value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="Not Assigned">Not Assigned</option>
                <option value="Plant">Plant</option>
                <option value="Medical">Medical</option>
                <option value="NLP">NLP</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePost}
              isDisabled={name == ""}
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
