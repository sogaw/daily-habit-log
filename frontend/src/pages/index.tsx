import { Navigate } from "react-router-dom";

import { useAuthSafely } from "@/providers/auth";

const Index = () => {
  const { authUser, me } = useAuthSafely();

  if (authUser && authUser.emailVerified && me) return <Navigate to="/home" />;
  if (authUser && authUser.emailVerified && !me) return <Navigate to="/onboard" />;
  if (authUser && !authUser.emailVerified && !me) return <Navigate to="/email-verification" />;
  if (!authUser && !me) return <Navigate to="/sign-in" />;

  throw new Error(
    `Unexpected authentication state. authUser?.emailVerified: ${authUser?.emailVerified}. me: ${JSON.stringify(me)}.`
  );
};

export default Index;
