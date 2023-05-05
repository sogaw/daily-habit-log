import { Timestamp } from "firebase-admin/firestore";

import { genId, genTimestamp, User, UserData, UsersCollection } from "@/datasource";

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
    iconPath: null,
    ...data,
  });
};
