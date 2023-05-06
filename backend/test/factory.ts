import { Timestamp } from "firebase-admin/firestore";

import {
  Habit,
  HabitData,
  HabitRecord,
  HabitRecordData,
  HabitRecordsCollection,
  HabitsCollection,
  User,
  UserData,
  UsersCollection,
} from "@/datasource";
import { genId, genTimestamp } from "@/lib/gen";

export const TimestampFactory = (dateString: string) => {
  return Timestamp.fromDate(new Date(dateString));
};

export const UserFactory = (collection: UsersCollection, id: string | null, data: Partial<UserData>) => {
  id = id || genId();
  const now = genTimestamp();
  return User.create(collection, id, {
    id,
    name: "MyString",
    createdAt: now,
    updatedAt: now,
    iconPath: "",
    ...data,
  });
};

export const HabitFactory = (
  collection: HabitsCollection,
  id: string | null,
  data: Partial<HabitData> & Pick<HabitData, "userId">
) => {
  id = id || genId();
  const now = genTimestamp();
  return Habit.create(collection, id, {
    id,
    name: "MyString",
    description: "MyString",
    createdAt: now,
    updatedAt: now,
    ...data,
  });
};

export const HabitRecordFactory = (
  collection: HabitRecordsCollection,
  id: string | null,
  data: Partial<HabitRecordData> & Pick<HabitRecordData, "userId" | "habitId">
) => {
  id = id || genId();
  const now = genTimestamp();
  return HabitRecord.create(collection, id, {
    id,
    date: "2023-01-01",
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
    ...data,
  });
};
