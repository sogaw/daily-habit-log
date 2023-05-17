import { Habit, HabitRecord } from "@/datasource";

import { builder } from "../builder";
import { HabitRecordStatus } from "../enum/habit-record-status";

builder.objectType(HabitRecord, {
  name: "HabitRecord",
  fields: (t) => ({
    id: t.exposeID("id"),
    date: t.string({ resolve: (habitRecord) => habitRecord.data.date }),
    status: t.field({ type: HabitRecordStatus, resolve: (habitRecord) => habitRecord.data.status }),
    habitId: t.string({ resolve: (habitRecord) => habitRecord.data.habitId }),
    habit: t.field({
      type: Habit,
      resolve: async (habitRecord, _, { datasource }) => datasource.habits.findOne(habitRecord.data.habitId),
    }),
  }),
});
