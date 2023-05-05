import { Firestore } from "firebase-admin/firestore";

import { UsersCollection } from "./datasource/fire-model";

export type Auth = { uid: string };

export type DataSource = {
  db: Firestore;
  users: UsersCollection;
};

export type Context = {
  auth: Auth | undefined;
  datasource: DataSource;
};
