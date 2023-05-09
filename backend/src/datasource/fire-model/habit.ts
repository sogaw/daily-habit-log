import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { genId, genTimestamp } from "@/lib/gen";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";
import { HabitRecordsCollection } from "./habit-record";

export type HabitData = {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
};

export class Habit extends FireDocument<HabitData> {
  habitRecords = new HabitRecordsCollection(this.ref.collection("habitRecords"));

  static create(
    collection: HabitsCollection,
    { name, description, userId }: Pick<HabitData, "name" | "description" | "userId">
  ) {
    const id = genId();
    const now = genTimestamp();
    return this.build(collection, id, {
      id,
      name,
      description,
      createdAt: now,
      updatedAt: now,
      userId,
    });
  }

  update({ name, description }: Pick<HabitData, "name" | "description">) {
    return this.updateData({ name, description, updatedAt: genTimestamp() });
  }
}

export class HabitsCollection extends FireCollection<Habit> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => Habit.fromSnapshot(snap));
  }

  all() {
    return this.findManyByQuery((ref) => ref.orderBy("updatedAt", "desc"));
  }
}

export class HabitsCollectionGroup extends FireCollectionGroup<Habit> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => Habit.fromSnapshot(snap));
  }
}
