import { Firestore } from "firebase-admin/firestore";

import { HabitRecordsCollectionGroup, HabitsCollectionGroup, UsersCollection } from "./datasource/fire-model";

export type Auth = { uid: string };

export type DataSource = {
  db: Firestore;
  users: UsersCollection;
  habits: HabitsCollectionGroup;
  habitRecords: HabitRecordsCollectionGroup;
};

export type Context = {
  auth: Auth | undefined;
  datasource: DataSource;
};
