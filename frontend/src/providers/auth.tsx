import { gql, useQuery } from "@apollo/client";
import { Box, Center, Link, Spinner, VStack } from "@chakra-ui/react";
import { getAuth, getIdToken, onIdTokenChanged, signOut, User as AuthUser } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useFragment } from "@/generated/gql";
import { MeDocument, MeFragment, MeFragmentDoc } from "@/generated/gql/graphql";
import { assertIsDefined } from "@/lib/assert-is-defined";

gql`
  fragment Me on User {
    id
    name
    iconUrl
  }
`;

gql`
  query me {
    viewer {
      id
      ...Me
    }
  }
`;

type State = {
  authUser: AuthUser | undefined;
  me: MeFragment | undefined;
  loading: boolean;
  error: unknown;
};

const useAuthProvider = (): State => {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [authUserLoading, setAuthUserLoading] = useState(true);
  const { data, loading: viewerLoading, error, refetch } = useQuery(MeDocument, { skip: !authUser });

  useEffect(() => {
    const unsub = onIdTokenChanged(getAuth(), async (authUser) => {
      if (authUser) {
        const token = await getIdToken(authUser);

        setAuthUser(authUser);
        localStorage.setItem("token", token);
      } else {
        setAuthUser(undefined);
        localStorage.removeItem("token");
      }

      if (authUserLoading) setAuthUserLoading(false);
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authUser) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const me = useFragment(MeFragmentDoc, data?.viewer) || undefined;
  const loading = authUserLoading || viewerLoading;

  return { authUser, me, loading, error };
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const state = useAuthProvider();

  if (state.loading)
    return (
      <Center h="75vh">
        <Spinner />
      </Center>
    );

  if (state.error)
    return (
      <VStack py="4">
        <Box fontWeight="bold" fontSize="xl">
          Error happened
        </Box>
        <Link
          onClick={() => {
            signOut(getAuth());
            location.href = "/";
          }}
        >
          reload
        </Link>
        <Box whiteSpace="pre-wrap">{JSON.stringify(state.error, null, 2)}</Box>
      </VStack>
    );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthSafely = () => {
  const state = useContext(AuthContext);
  assertIsDefined(state);
  return state;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const state = useContext(AuthContext);
  assertIsDefined(state);
  assertIsDefined(state.authUser);
  return {
    ...state,
    authUser: state.authUser,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMe = () => {
  const state = useContext(AuthContext);
  assertIsDefined(state);
  assertIsDefined(state.authUser);
  assertIsDefined(state.me);
  return {
    ...state,
    authUser: state.authUser,
    me: state.me,
  };
};
