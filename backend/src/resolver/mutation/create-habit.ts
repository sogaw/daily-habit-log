import { z } from "zod";

import { Habit } from "@/datasource";
import { parseAuth, parseSchema } from "@/lib/parse";

import { builder } from "../builder";

const CreateHabitInput = builder.inputType("CreateHabitInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: true }),
  }),
});

const CreateHabitInputSchema = z.object({ name: z.string().min(1), description: z.string() });

builder.mutationField("createHabit", (t) =>
  t.field({
    type: Habit,
    args: { input: t.arg({ type: CreateHabitInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseSchema(CreateHabitInputSchema, args.input);

      const me = await datasource.users.findOne(auth.uid);

      const habit = Habit.create(me.habits, {
        name: args.input.name,
        description: args.input.description,
        userId: me.id,
      });
      await habit.save();

      return habit;
    },
  })
);
