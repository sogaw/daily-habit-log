import { CollectionGroup, CollectionReference, getFirestore, Timestamp } from "firebase-admin/firestore";

import { genNow } from "@/lib/gen";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";

/**
 * Firestore structure
 *
 * /users/${userId}
 *
 */

/**
 * Util
 */
export const genId = () => getFirestore().collection("-").doc().id;
export const genTimestamp = () => Timestamp.fromDate(genNow());

/**
 * Document
 */
export type UserData = {
  id: string;
  name: string;
  iconPath: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type HabitData = {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
};

export type HabitRecordData = {
  id: string;
  date: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  habitId: string;
};

export class User extends FireDocument<UserData> {
  habits = new HabitsCollection(this.ref.collection("habits"));
}

export class Habit extends FireDocument<HabitData> {
  habitRecords = new HabitRecordsCollection(this.ref.collection("habitRecords"));
}

export class HabitRecord extends FireDocument<HabitRecordData> {
  static createFrom(collection: HabitRecordsCollection, data: Pick<HabitRecordData, "date" | "userId" | "habitId">) {
    const id = genId();
    const now = genTimestamp();
    return this.create(collection, id, { id, status: "PENDING", createdAt: now, updatedAt: now, ...data });
  }
}

/**
 * Collection
 */
export class UsersCollection extends FireCollection<User> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => User.fromSnapshot(snap));
  }
}

export class HabitsCollection extends FireCollection<Habit> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => Habit.fromSnapshot(snap));
  }
}

export class HabitRecordsCollection extends FireCollection<HabitRecord> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => HabitRecord.fromSnapshot(snap));
  }

  ordered({ before }: { before: string }) {
    return this.findManyByQuery((ref) => ref.orderBy("date", "desc").endBefore(before));
  }
}

/**
 * Collection Group
 */
export class HabitsCollectionGroup extends FireCollectionGroup<Habit> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => Habit.fromSnapshot(snap));
  }
}

export class HabitRecordsCollectionGroup extends FireCollectionGroup<HabitRecord> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => HabitRecord.fromSnapshot(snap));
  }
}
