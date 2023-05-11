import {
  Box,
  Container,
  ContainerProps,
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

export const Layout = ({
  title = "Daily Habit Log",
  backPath,
  children,
  ...props
}: {
  title?: string;
  backPath?: string;
  children: ReactNode;
} & ContainerProps) => {
  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOut(getAuth());
    location.href = "/";
  };

  return (
    <Box>
      <Box position="sticky" top="0" bg="white" boxShadow="sm" zIndex="10">
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
                <MenuItem onClick={() => navigate("/me/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => navigate("/me/account")}>Account</MenuItem>
                <MenuDivider />
                <MenuItem onClick={onSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Container>
      </Box>

      <Container py="4" {...props}>
        {children}
      </Container>
    </Box>
  );
};
