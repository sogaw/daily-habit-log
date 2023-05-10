import { Box, Center, Link, Spinner } from "@chakra-ui/react";
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
      <Center py="4">
        <Box>Error happened.</Box>
        <Link onClick={() => (location.href = "/")}>reload</Link>
        <Box>{JSON.stringify(error, null, 2)}</Box>
      </Center>
    );

  return <>{children}</>;
};
