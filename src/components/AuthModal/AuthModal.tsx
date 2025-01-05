import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { AuthForm } from "./AuthForm";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AuthForm isLogin={isLogin} onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Text>Sign up ?</Text>
              <Switch
                colorScheme="teal"
                size="lg"
                onChange={() => setIsLogin(!isLogin)}
                defaultChecked={!isLogin}
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
