import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { ReactNode } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { DeleteAccountDocument } from "@/generated/gql/graphql";
import { useAppToast } from "@/hooks/use-app-toast";

gql`
  mutation deleteAccount {
    deleteAccount
  }
`;

export const Layout = ({
  title = "Fire GQL Template",
  backPath,
  children,
}: {
  title?: string;
  backPath?: string;
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const toast = useAppToast();

  const onSignOut = async () => {
    await signOut(getAuth());
    location.href = "/";
  };

  const [deleteAccount] = useMutation(DeleteAccountDocument, {
    onCompleted: async () => {
      await signOut(getAuth());
      location.href = "/";
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  const onDeleteAccount = async () => {
    if (confirm("Are you sure?")) await deleteAccount();
  };

  return (
    <Flex direction="column" h="full">
      <Container display="flex" justifyContent="space-between" alignItems="center" py="3">
        <Box w="8">
          {backPath && (
            <IconButton
              aria-label="back"
              size="sm"
              variant="ghost"
              icon={<Icon as={FaArrowLeft} />}
              onClick={() => navigate(backPath)}
            />
          )}
        </Box>
        <Box fontWeight="bold" fontSize="xl" textAlign="center" noOfLines={1}>
          {title}
        </Box>
        <Box w="8">
          <Menu placement="bottom-end">
            <MenuButton as={IconButton} icon={<Icon as={FaBars} />} size="sm" variant="ghost" />
            <MenuList>
              <MenuItem onClick={() => navigate("/me/edit")}>Edit profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={onSignOut}>Sign out</MenuItem>
              <MenuItem onClick={onDeleteAccount}>Delete account</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>

      <Box flex="1" position="relative">
        <Box position="absolute" inset="0" overflowY="auto">
          <Container h="full">{children}</Container>
        </Box>
      </Box>
    </Flex>
  );
};
