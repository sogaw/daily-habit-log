import { getAuth } from "firebase-admin/auth";

import { Auth } from "@/types";

import { Unauthorized } from "./error";

export const extractJWT = (request: Request): string | undefined => {
  const token = request.headers.get("authorization")?.split("Bearer ").at(1);
  return token;
};

export const decodeJWT = async (token: string): Promise<Auth> => {
  try {
    const decoded = await getAuth().verifyIdToken(token);
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.errorInfo?.code == "auth/id-token-revoked") throw new Unauthorized("Unauthorized. Token revoked");
    throw new Unauthorized();
  }
};

export const deleteAuth = async (auth: Auth) => {
  await getAuth().deleteUser(auth.uid);
};
