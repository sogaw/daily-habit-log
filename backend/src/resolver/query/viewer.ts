import { User } from "@/datasource";

import { builder } from "../builder";

builder.queryField("viewer", (t) =>
  t.field({
    type: User,
    nullable: true,
    resolve: async (_root, _args, { auth, datasource }) => {
      return auth ? datasource.users.findOneById(auth.uid) : null;
    },
  })
);
