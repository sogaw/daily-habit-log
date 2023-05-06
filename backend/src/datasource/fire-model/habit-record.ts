import { eachDayOfInterval } from "date-fns";
import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { AsiaTokyoISO, DateFromISO } from "@/lib/date";
import { genId, genNow, genTimestamp } from "@/lib/gen";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";

export type HabitRecordData = {
  id: string;
  date: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  habitId: string;
};

export class HabitRecord extends FireDocument<HabitRecordData> {
  static create(
    collection: HabitRecordsCollection,
    { date, status, userId, habitId }: Pick<HabitRecordData, "date" | "status" | "userId" | "habitId">
  ) {
    const id = genId();
    const now = genTimestamp();
    return this.build(collection, id, {
      id,
      date,
      status,
      createdAt: now,
      updatedAt: now,
      userId,
      habitId,
    });
  }

  update({ status }: Pick<HabitRecordData, "status">) {
    return this.updateData({ status, updatedAt: genTimestamp() });
  }
}

export class HabitRecordsCollection extends FireCollection<HabitRecord> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => HabitRecord.fromSnapshot(snap));
  }

  async ordered({ userId, habitId, before }: { userId: string; habitId: string; before: string }) {
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
        : HabitRecord.create(this, {
            date: habitRecord.date,
            status: "PENDING",
            userId,
            habitId,
          })
    );

    return filled;
  }

  findByDate(date: string) {
    return this.findManyByQuery((ref) => ref.where("date", "==", date)).then((res) => res.at(0));
  }
}

export class HabitRecordsCollectionGroup extends FireCollectionGroup<HabitRecord> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => HabitRecord.fromSnapshot(snap));
  }
}
