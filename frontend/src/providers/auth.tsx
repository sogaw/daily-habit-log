import { getAuth, onIdTokenChanged, User as AuthUser } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { AuthFallback } from "@/components/AuthFallback";
import { assertIsDefined } from "@/lib/assert-is-defined";

type State = {
  authUser: AuthUser | undefined;
  loading: boolean;
  error: unknown;
};

const useAuthProvider = (): State => {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const unsub = onIdTokenChanged(
      getAuth(),
      (authUser) => {
        setAuthUser(authUser || undefined);
        setError(undefined);
        if (loading) setLoading(false);
      },
      (e) => {
        setAuthUser(undefined);
        setError(e);
      }
    );

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authUser, loading, error };
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const state = useAuthProvider();

  return (
    <AuthFallback loading={state.loading} error={state.error}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthFallback>
  );
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
