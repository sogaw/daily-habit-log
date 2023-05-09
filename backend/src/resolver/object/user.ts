import { Habit, User } from "@/datasource";
import { Sprint } from "@/datasource/fire-model/sprint";
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
      resolve: (user) => user.habits.all(),
    }),

    habit: t.field({
      type: Habit,
      args: { id: t.arg({ type: "ID", required: true }) },
      resolve: (user, args) => {
        parseId(args.id);

        return user.habits.findOne(args.id);
      },
    }),

    activeSprints: t.field({
      type: [Sprint],
      resolve: (user) => user.sprints.active(),
    }),

    sprints: t.field({
      type: [Sprint],
      resolve: (user) => user.sprints.all(),
    }),

    sprint: t.field({
      type: Sprint,
      args: { id: t.arg({ type: "ID", required: true }) },
      resolve: (user, args) => {
        parseId(args.id);

        return user.sprints.findOne(args.id);
      },
    }),
  }),
});
