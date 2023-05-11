import { gql, useQuery } from "@apollo/client";
import { createContext, ReactNode, useContext } from "react";

import { AuthFallback } from "@/components/AuthFallback";
import { useFragment } from "@/generated/gql";
import { MeDocument, MeFragment, MeFragmentDoc } from "@/generated/gql/graphql";
import { assertIsDefined } from "@/lib/assert-is-defined";

import { useAuthSafely } from "./auth";

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
  me: MeFragment | undefined;
  loading: boolean;
  error: unknown;
};

const useMeProvider = () => {
  const { authUser } = useAuthSafely();

  const { data, loading, error } = useQuery(MeDocument, { skip: !authUser });

  const me = useFragment(MeFragmentDoc, data?.viewer);

  return { me: me || undefined, loading, error };
};

const MeContext = createContext<State | undefined>(undefined);

export const MeProvider = ({ children }: { children: ReactNode }) => {
  const state = useMeProvider();

  return (
    <AuthFallback loading={state.loading} error={state.error}>
      <MeContext.Provider value={state}>{children}</MeContext.Provider>
    </AuthFallback>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMeSafely = () => {
  const state = useContext(MeContext);
  assertIsDefined(state);
  return state;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMe = () => {
  const state = useContext(MeContext);
  assertIsDefined(state);
  assertIsDefined(state.me);
  return {
    ...state,
    me: state.me,
  };
};
