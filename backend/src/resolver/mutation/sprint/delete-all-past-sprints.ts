import { User } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../../builder";

builder.mutationField("deleteAllPastSprints", (t) =>
  t.field({
    type: User,
    resolve: async (_root, _args, { auth, datasource }) => {
      parseAuth(auth);

      const me = await datasource.users.findOne(auth.uid);
      const pastSprints = await me.sprints.past();

      await Promise.all(pastSprints.map((sprint) => sprint.destroy()));

      return me;
    },
  })
);
