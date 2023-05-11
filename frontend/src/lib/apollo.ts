import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuth } from "firebase/auth";

const uri = [import.meta.env.VITE_APP_BACKEND_URL, "graphql"].join("/");

const httpLink = createHttpLink({ uri });

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuth().currentUser?.getIdToken(true);
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : "" } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      HabitRecord: {
        keyFields: (habitRecord) => {
          return [habitRecord.habitId, habitRecord.date].join(":");
        },
      },
    },
  }),
});
