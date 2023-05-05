import { Habit, HabitRecord } from "@/datasource";

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
        // TODO
        const habitRecords = habit.habitRecords.findManyByQuery((ref) => ref.orderBy("createdAt", "desc"));
        return habitRecords;
      },
    }),
  }),
});
