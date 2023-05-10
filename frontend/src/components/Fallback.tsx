import { Box, Center, Link, Spinner, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Fallback = ({ loading, error, children }: { loading: boolean; error: unknown; children: ReactNode }) => {
  if (loading)
    return (
      <Center py="4">
        <Spinner />
      </Center>
    );

  if (error)
    return (
      <VStack py="4">
        <Box fontWeight="bold" fontSize="xl">
          Error happened
        </Box>
        <Link onClick={() => (location.href = "/")}>reload</Link>
        <Box whiteSpace="pre-wrap">{JSON.stringify(error, null, 2)}</Box>
      </VStack>
    );

  return <>{children}</>;
};
