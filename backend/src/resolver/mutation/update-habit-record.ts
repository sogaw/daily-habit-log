import { z } from "zod";

import { HabitRecord } from "@/datasource";
import { parseAuth, parseSchema } from "@/lib/parse";

import { builder } from "../builder";

const UpdateHabitRecordInput = builder.inputType("UpdateHabitRecordInput", {
  fields: (t) => ({
    habitId: t.string({ required: true }),
    date: t.string({ required: true }),
    status: t.string({ required: true }),
  }),
});

const UpdateHabitRecordInputSchema = z.object({
  habitId: z.string().min(1),
  date: z.string().min(1),
  status: z.union([z.literal("SUCCESS"), z.literal("FAILED"), z.literal("PENDING")]),
});

builder.mutationField("updateHabitRecord", (t) =>
  t.field({
    type: HabitRecord,
    args: { input: t.arg({ type: UpdateHabitRecordInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseSchema(UpdateHabitRecordInputSchema, args.input);

      const me = await datasource.users.findOne(auth.uid);
      const habit = await me.habits.findOne(args.input.habitId);
      const existsHabitRecord = await habit.habitRecords.findByDate(args.input.date);

      if (existsHabitRecord) {
        existsHabitRecord.updateFrom({ status: args.input.status });
        await existsHabitRecord.save();

        return existsHabitRecord;
      }

      const habitRecord = HabitRecord.createFrom(habit.habitRecords, {
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
