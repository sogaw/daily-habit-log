import { HabitRecord } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../builder";
import { HabitRecordStatus } from "../enum/habit-record-status";

const UpdateHabitRecordInput = builder.inputType("UpdateHabitRecordInput", {
  fields: (t) => ({
    habitId: t.string({ required: true, validate: { minLength: 1 } }),
    date: t.string({ required: true, validate: { minLength: 1 } }),
    status: t.field({ type: HabitRecordStatus, required: true }),
  }),
});

builder.mutationField("updateHabitRecord", (t) =>
  t.field({
    type: HabitRecord,
    args: { input: t.arg({ type: UpdateHabitRecordInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const me = await datasource.users.findOne(auth.uid);
      const habit = await me.habits.findOne(args.input.habitId);
      const existsHabitRecord = await habit.habitRecords.findByDate(args.input.date);

      if (existsHabitRecord) {
        existsHabitRecord.update({ status: args.input.status });
        await existsHabitRecord.save();

        return existsHabitRecord;
      }

      const habitRecord = HabitRecord.create(habit.habitRecords, {
        date: args.input.date,
        status: args.input.status,
        userId: me.id,
        habitId: habit.id,
      });
      await habitRecord.save();

      return habitRecord;
    },
  })
);
