import { Habit } from "@/datasource";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../../builder";

const UpdateHabitInput = builder.inputType("UpdateHabitInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField("updateHabit", (t) =>
  t.field({
    type: Habit,
    args: { id: t.arg({ type: "ID", required: true }), input: t.arg({ type: UpdateHabitInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const habit = await me.habits.findOne(args.id);

      return habit
        .update({
          name: args.input.name,
          description: args.input.description,
        })
        .save();
    },
  })
);
