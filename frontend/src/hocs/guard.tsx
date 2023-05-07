import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthSafely } from "@/providers/auth";

export function Guard<P extends object>(
  pattern: "BeforeAuth" | "BeforeEmailVerify" | "BeforeOnboard" | "AfterOnboard",
  Comp: FC<P>
) {
  return function WrappedWithGuard(props: P) {
    const comp = <Comp {...props} />;
    const { authUser, me } = useAuthSafely();

    switch (pattern) {
      case "BeforeAuth":
        if (!authUser) return comp;
        break;

      case "BeforeEmailVerify":
        if (authUser && !authUser.emailVerified) return comp;
        break;

      case "BeforeOnboard":
        if (authUser && authUser.emailVerified && !me) return comp;
        break;

      case "AfterOnboard":
        if (authUser && authUser.emailVerified && me) return comp;
        break;
    }

    return <Navigate to="/" />;
  };
}
