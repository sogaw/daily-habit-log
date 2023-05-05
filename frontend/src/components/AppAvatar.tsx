import { Avatar, Box, BoxProps, Center, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppAvatar = ({ src, size, ...rest }: { src?: string; size?: string } & BoxProps) => {
  return (
    <Box {...rest}>
      {src ? (
        <Avatar size="2xl" border="3px gray solid" src={src} />
      ) : (
        <Center h="32" w="32" border="3px solid" rounded="full" bg="gray.400" color="white">
          <Icon as={FaUser} fontSize="7xl" />
        </Center>
      )}
    </Box>
  );
};
