import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthSafely } from "@/providers/auth";

export function Guard<P extends object>(
  pattern: "SignInUpPage" | "EmailVerificationPage" | "OnboardPage" | "WithOnboard",
  Comp: FC<P>
) {
  return function WrappedWithGuard(props: P) {
    const comp = <Comp {...props} />;
    const { authUser, me } = useAuthSafely();

    switch (pattern) {
      case "SignInUpPage":
        if (!authUser) return comp;
        break;

      case "EmailVerificationPage":
        if (authUser && !authUser.emailVerified) return comp;
        break;

      case "OnboardPage":
        if (authUser && authUser.emailVerified && !me) return comp;
        break;

      case "WithOnboard":
        if (authUser && authUser.emailVerified && me) return comp;
        break;
    }

    return <Navigate to="/" />;
  };
}
