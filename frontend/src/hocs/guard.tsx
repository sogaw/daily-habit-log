import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthSafely } from "@/providers/auth";
import { useMeSafely } from "@/providers/me";

export function Guard<P extends object>(
  pattern: "BeforeAuth" | "BeforeEmailVerify" | "BeforeOnboard" | "AfterOnboard",
  Comp: FC<P>
) {
  return function WrappedWithGuard(props: P) {
    const comp = <Comp {...props} />;

    const { authUser } = useAuthSafely();
    const { me } = useMeSafely();

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
