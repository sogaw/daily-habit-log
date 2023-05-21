import { Habit } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../../builder";

const CreateHabitInput = builder.inputType("CreateHabitInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField("createHabit", (t) =>
  t.field({
    type: Habit,
    args: { input: t.arg({ type: CreateHabitInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const me = await datasource.users.findOne(auth.uid);

      return Habit.create(me.habits, {
        name: args.input.name,
        description: args.input.description,
        userId: me.id,
      }).save();
    },
  })
);
