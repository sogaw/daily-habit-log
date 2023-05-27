import { auth } from "@script/setup";
import { subDays } from "date-fns";
import { Timestamp } from "firebase-admin/firestore";

import { Habit, Sprint, User } from "@/datasource";
import { createDatasourceContext } from "@/resolver";

const datasource = createDatasourceContext();

const ArrayFrom = (length: number) => Array.from({ length });

(async () => {
  const userOne = await auth.getUserByEmail("user-1@example.com").catch(() => undefined);

  if (userOne) {
    await auth.deleteUser(userOne.uid);
    await datasource.users.findOne(userOne.uid).then((u) => u.recursiveDestroy());
  }

  const { uid } = await auth.createUser({ email: "user-1@example.com", password: "Password00", emailVerified: true });
  const user = await User.create(datasource.users, { id: uid, name: "UserOne", iconPath: "" }).save();

  await Promise.all([
    ...ArrayFrom(5).map((_, i) => {
      const now = Timestamp.fromDate(subDays(new Date(), i));
      return Habit.create(user.habits, { name: `habit-${i}`, description: "", userId: user.id })
        .updateData({ createdAt: now, updatedAt: now })
        .save();
    }),
    ...ArrayFrom(5).map((_, i) => {
      const now = Timestamp.fromDate(subDays(new Date(), i));
      return Sprint.create(user.sprints, { name: `sprint-${i}`, description: "", userId: user.id })
        .updateData({ createdAt: now, updatedAt: now })
        .save();
    }),
  ]);
})().catch(console.error);
