import { compareDesc, isBefore, startOfDay, subDays } from "date-fns";

import { Habit, HabitRecord } from "@/datasource";
import { fixTimezone } from "@/lib/date";
import { genDate } from "@/lib/gen";
import { Identity } from "@/lib/identity";

import { builder } from "../builder";

builder.objectType(Habit, {
  name: "Habit",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.string({ resolve: (note) => note.data.name }),
    description: t.string({ resolve: (note) => note.data.description }),

    habitRecords: t.field({
      type: [HabitRecord],
      resolve: async (habit) => {
        const fiveDaysAgo = subDays(genDate(), 4);
        const habitCreatedAt = habit.data.createdAt.toDate();
        const [before] = [fiveDaysAgo, habitCreatedAt].sort(compareDesc);

        return habit.habitRecords.latest({
          userId: habit.data.userId,
          habitId: habit.id,
          before,
        });
      },
    }),

    tooHard: t.boolean({
      resolve: async (habit) => {
        const threeDaysAgo = subDays(genDate(), 2);
        const habitCreatedAt = habit.data.createdAt.toDate();

        const threeDaysAgoStart = Identity.of(threeDaysAgo).map(startOfDay).map(fixTimezone).unwrap();
        const habitCreatedAtStart = Identity.of(habitCreatedAt).map(startOfDay).map(fixTimezone).unwrap();

        if (isBefore(threeDaysAgoStart, habitCreatedAtStart)) return false;

        const success = await habit.habitRecords.success({ before: threeDaysAgo });
        return success.count == 0;
      },
    }),
  }),
});
