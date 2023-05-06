import { compareDesc, subDays } from "date-fns";

import { Habit, HabitRecord } from "@/datasource";
import { AsiaTokyoISO, DateFromISO } from "@/lib/date";
import { genNow } from "@/lib/gen";

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
        const sixDaysAgo = subDays(genNow(), 6);
        const habitCreatedAt = habit.data.createdAt.toDate();
        const [before] = [sixDaysAgo, habitCreatedAt].sort(compareDesc);

        return habit.habitRecords.ordered({
          userId: habit.data.userId,
          habitId: habit.id,
          before: DateFromISO(AsiaTokyoISO(before)),
        });
      },
    }),
    tooHard: t.boolean({
      resolve: async (habit) => {
        const twoDaysAgo = subDays(genNow(), 2);
        const habitCreatedAt = habit.data.createdAt.toDate();
        const [before] = [twoDaysAgo, habitCreatedAt].sort(compareDesc);

        const habitRecords = await habit.habitRecords.ordered({
          userId: habit.data.userId,
          habitId: habit.id,
          before: DateFromISO(AsiaTokyoISO(before)),
        });

        return habitRecords.filter((habitRecord) => habitRecord.data.status == "SUCCESS").length == 0;
      },
    }),
  }),
});
