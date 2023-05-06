import { CollectionReference, Timestamp } from "firebase-admin/firestore";

import { genTimestamp } from "@/lib/gen";

import { FireCollection, FireDocument } from "../fire-model-package";
import { HabitsCollection } from "./habit";

export type UserData = {
  id: string;
  name: string;
  iconPath: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class User extends FireDocument<UserData> {
  habits = new HabitsCollection(this.ref.collection("habits"));

  static create(collection: UsersCollection, { id, name, iconPath }: Pick<UserData, "id" | "name" | "iconPath">) {
    const now = genTimestamp();
    return this.build(collection, id, {
      id,
      name,
      iconPath,
      createdAt: now,
      updatedAt: now,
    });
  }

  update({ name, iconPath }: Pick<UserData, "name" | "iconPath">) {
    return this.updateData({ name, iconPath, updatedAt: genTimestamp() });
  }
}

export class UsersCollection extends FireCollection<User> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => User.fromSnapshot(snap));
  }
}
