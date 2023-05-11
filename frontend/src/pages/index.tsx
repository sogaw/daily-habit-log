import { Navigate } from "react-router-dom";

import { useAuthSafely } from "@/providers/auth";
import { useMeSafely } from "@/providers/me";

const Index = () => {
  const { authUser } = useAuthSafely();
  const { me } = useMeSafely();

  if (authUser && authUser.emailVerified && me) return <Navigate to="/home" />;
  if (authUser && authUser.emailVerified && !me) return <Navigate to="/onboard" />;
  if (authUser && !authUser.emailVerified && !me) return <Navigate to="/email-verification" />;
  if (!authUser && !me) return <Navigate to="/sign-in" />;

  throw new Error(
    `Unexpected authentication state. authUser?.emailVerified: ${authUser?.emailVerified}. me: ${JSON.stringify(me)}.`
  );
};

export default Index;
