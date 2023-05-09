import { compareDesc, subDays } from "date-fns";

import { Habit, HabitRecord } from "@/datasource";
import { genDate } from "@/lib/gen";

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
        const sixDaysAgo = subDays(genDate(), 6);
        const habitCreatedAt = habit.data.createdAt.toDate();
        const [before] = [sixDaysAgo, habitCreatedAt].sort(compareDesc);

        return habit.habitRecords.latest({
          userId: habit.data.userId,
          habitId: habit.id,
          before,
        });
      },
    }),

    tooHard: t.boolean({
      resolve: async (habit) => {
        const threeDaysAgo = subDays(genDate(), 3);
        const habitCreatedAt = habit.data.createdAt.toDate();
        const [before] = [threeDaysAgo, habitCreatedAt].sort(compareDesc);

        const habitRecords = await habit.habitRecords.latest({
          userId: habit.data.userId,
          habitId: habit.id,
          before,
        });

        return (
          habitRecords.length > 3 &&
          habitRecords.filter((habitRecord) => habitRecord.data.status == "SUCCESS").length == 0
        );
      },
    }),
  }),
});
