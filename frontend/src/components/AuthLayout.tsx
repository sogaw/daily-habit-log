import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW="md">
      <Box fontWeight="bold" fontSize="xl" textAlign="center" py="3">
       Daily Habit Log
      </Box>
      <Box>{children}</Box>
    </Container>
  );
};
