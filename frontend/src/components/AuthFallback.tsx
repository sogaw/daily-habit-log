import { Box, Center, Link, Spinner, VStack } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { ReactNode } from "react";

export const AuthFallback = ({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: unknown;
  children: ReactNode;
}) => {
  if (loading)
    return (
      <Center h="75vh">
        <Spinner />
      </Center>
    );

  if (error)
    return (
      <VStack p="2">
        <Box fontWeight="bold" fontSize="xl">
          Error happened
        </Box>
        <Link
          onClick={async () => {
            await signOut(getAuth());
            location.href = "/";
          }}
        >
          reload
        </Link>
        <Box whiteSpace="pre-wrap">{JSON.stringify(error, null, 2)}</Box>
      </VStack>
    );

  return <>{children}</>;
};
