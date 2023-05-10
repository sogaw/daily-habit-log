import { getFirestore } from "firebase-admin/firestore";

import { HabitRecordsCollectionGroup, HabitsCollectionGroup, UsersCollection } from "@/datasource/fire-model";
import { decodeJWT, extractJWT } from "@/lib/auth";
import { Context } from "@/types";

export const createAuthContext = async ({ request }: { request: Request }): Promise<Context["auth"]> => {
  const token = extractJWT(request);

  return token ? await decodeJWT(token) : undefined;
};

export const createDatasourceContext = (): Context["datasource"] => {
  const db = getFirestore();

  const users = new UsersCollection(db.collection("users"));

  const habits = new HabitsCollectionGroup(db.collectionGroup("habits"));
  const habitRecords = new HabitRecordsCollectionGroup(db.collectionGroup("habitRecords"));

  return { db, users, habits, habitRecords };
};
