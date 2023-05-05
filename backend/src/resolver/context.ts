import { getFirestore } from "firebase-admin/firestore";

import { UsersCollection } from "@/datasource/fire-model";
import { decodeJWT, extractJWT } from "@/lib/auth";
import { Context } from "@/types";

export const authContext = async ({ request }: { request: Request }): Promise<Context["auth"]> => {
  const token = extractJWT(request);

  return token ? await decodeJWT(token) : undefined;
};

export const datasourceContext = (): Context["datasource"] => {
  const db = getFirestore();
  const users = new UsersCollection(db.collection("users"));

  return { db, users };
};
