import { eachDayOfInterval } from "date-fns";
import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { AsiaTokyoISO, DateFromISO } from "@/lib/date";
import { genId, genNow, genTimestamp } from "@/lib/gen";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";

/**
 * Firestore structure
 *
 * /users/${userId}
 *
 */

/**
 * Document
 */
export type UserData = {
  id: string;
  name: string;
  iconPath: string;
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

  static createFrom(collection: UsersCollection, { id, name, iconPath }: Pick<UserData, "id" | "name" | "iconPath">) {
    const now = genTimestamp();
    return this.create(collection, id, {
      id,
      name,
      iconPath,
      createdAt: now,
      updatedAt: now,
    });
  }

  updateFrom({ name, iconPath }: Pick<UserData, "name" | "iconPath">) {
    this.update({ name, iconPath, updatedAt: genTimestamp() });
  }
}

export class Habit extends FireDocument<HabitData> {
  habitRecords = new HabitRecordsCollection(this.ref.collection("habitRecords"));

  static createFrom(
    collection: HabitsCollection,
    { name, description, userId }: Pick<HabitData, "name" | "description" | "userId">
  ) {
    const id = genId();
    const now = genTimestamp();
    return this.create(collection, id, {
      id,
      name,
      description,
      createdAt: now,
      updatedAt: now,
      userId,
    });
  }
}

export class HabitRecord extends FireDocument<HabitRecordData> {
  static createFrom(
    collection: HabitRecordsCollection,
    { date, status, userId, habitId }: Pick<HabitRecordData, "date" | "status" | "userId" | "habitId">
  ) {
    const id = genId();
    const now = genTimestamp();
    return this.create(collection, id, {
      id,
      date,
      status,
      createdAt: now,
      updatedAt: now,
      userId,
      habitId,
    });
  }

  updateFrom({ status }: Pick<HabitRecordData, "status">) {
    this.update({ status, updatedAt: genTimestamp() });
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

  ordered() {
    return this.findManyByQuery((ref) => ref.orderBy("updatedAt", "desc"));
  }
}

export class HabitRecordsCollection extends FireCollection<HabitRecord> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => HabitRecord.fromSnapshot(snap));
  }

  async ordered({ habit, before }: { habit: Habit; before: string }) {
    const habitRecords = await this.findManyByQuery((ref) => ref.orderBy("date", "desc").endAt(before));

    const interval = eachDayOfInterval({ start: new Date(before), end: genNow() })
      .reverse()
      .map((dateTime) => {
        const date = DateFromISO(AsiaTokyoISO(dateTime));

        const exists = habitRecords.find((habitRecord) => habitRecord.data.date == date);
        if (exists) return exists;

        return { date };
      });

    const filled = interval.map((habitRecord) =>
      habitRecord instanceof HabitRecord
        ? habitRecord
        : HabitRecord.createFrom(habit.habitRecords, {
            date: habitRecord.date,
            status: "PENDING",
            userId: habit.data.userId,
            habitId: habit.id,
          })
    );

    return filled;
  }

  findByDate(date: string) {
    return this.findManyByQuery((ref) => ref.where("date", "==", date)).then((res) => res.at(0));
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
