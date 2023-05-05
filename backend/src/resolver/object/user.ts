import { Habit, User } from "@/datasource";
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
      resolve: (user) => user.habits.findManyByQuery((ref) => ref.orderBy("updatedAt", "desc")),
    }),
  }),
});
