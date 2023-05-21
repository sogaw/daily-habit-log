import { Habit } from "@/datasource";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../../builder";

builder.mutationField("deleteHabit", (t) =>
  t.field({
    type: Habit,
    args: { id: t.arg({ type: "ID", required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const habit = await me.habits.findOne(args.id);

      return habit.recursiveDestroy();
    },
  })
);
