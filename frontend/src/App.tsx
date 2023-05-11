import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { client } from "./lib/apollo";
import { router } from "./lib/router";
import { AuthProvider } from "./providers/auth";
import { MeProvider } from "./providers/me";

export const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <MeProvider>
            <RouterProvider router={router} />
          </MeProvider>
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
