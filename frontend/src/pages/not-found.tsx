import { Box, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <VStack py="8">
      <Box fontWeight="bold" fontSize="xl">
        Not Found
      </Box>
      <Link to="/">back</Link>
    </VStack>
  );
};

export default NotFound;
