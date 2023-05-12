import { eachDayOfInterval, startOfDay, subMinutes } from "date-fns";
import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { DateFromISO } from "@/lib/date";
import { genDate, genId, genTimestamp } from "@/lib/gen";
import { logger } from "@/lib/logger";

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

  async latest({ userId, habitId, before }: { userId: string; habitId: string; before: Date }) {
    const beforeDate = DateFromISO(before.toISOString());
    const habitRecords = await this.findManyByQuery((ref) => ref.orderBy("date", "desc").endAt(beforeDate));

    const start = startOfDay(before);
    const end = startOfDay(genDate());

    const interval = eachDayOfInterval({ start, end })
      .map((dateTime) => subMinutes(dateTime, dateTime.getTimezoneOffset())) // TimeZone の調整
      .map((dateTime) => {
        const date = DateFromISO(dateTime.toISOString());

        const exists = habitRecords.find((habitRecord) => habitRecord.data.date == date);
        if (exists) return exists;

        return { date };
      });

    const filled = interval.reverse().map((habitRecord) =>
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

  async success({ before }: { before: Date }) {
    const beforeDate = DateFromISO(before.toISOString());
    const success = await this.ref
      .where("status", "==", "SUCCESS")
      .orderBy("date", "desc")
      .endBefore(beforeDate)
      .count()
      .get()
      .then((snap) => snap.data());
    logger.debug(`[Fire] read 1 aggregate from ${this.constructor.name} collection`);
    return success;
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
