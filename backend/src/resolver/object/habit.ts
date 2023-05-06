import { compareDesc, eachDayOfInterval, subDays } from "date-fns";

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

        const [latestDateTime] = [sixDaysAgo, habitCreatedAt].sort(compareDesc);
        const beforeDateTime = subDays(latestDateTime, 1);
        const beforeDate = DateFromISO(AsiaTokyoISO(beforeDateTime));

        const habitRecords = await habit.habitRecords.ordered({ before: beforeDate });

        const filledHabitRecords = eachDayOfInterval({ start: latestDateTime, end: genNow() })
          .reverse()
          .map((dateTime) => {
            const date = DateFromISO(AsiaTokyoISO(dateTime));
            const exists = habitRecords.find((habitRecord) => habitRecord.data.date == date);

            if (exists) return exists;

            return HabitRecord.createFrom(habit.habitRecords, { date, userId: habit.data.userId, habitId: habit.id });
          });

        return filledHabitRecords;
      },
    }),
  }),
});
