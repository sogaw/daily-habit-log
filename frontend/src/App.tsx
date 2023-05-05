import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { client } from "./lib/apollo";
import { router } from "./lib/router";
import { AuthProvider } from "./providers/auth";

export const App = () => {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
};
