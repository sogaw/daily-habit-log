import { Habit, User } from "@/datasource";
import { parseId } from "@/lib/parse";
import { getSignedUrl } from "@/lib/storage";

import { builder } from "../builder";

builder.objectType(User, {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.string({ resolve: (user) => user.data.name }),

    iconUrl: t.string({
      resolve: (user) => {
        const path = user.data.iconPath;
        if (path) return getSignedUrl(path);
      },
      nullable: true,
    }),

    habits: t.field({
      type: [Habit],
      resolve: (user) => user.habits.ordered(),
    }),

    habit: t.field({
      type: Habit,
      args: { id: t.arg({ type: "ID", required: true }) },
      resolve: (user, args) => {
        parseId(args.id);

        return user.habits.findOne(args.id);
      },
    }),
  }),
});
