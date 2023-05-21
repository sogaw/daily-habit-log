import { Sprint } from "@/datasource";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../../builder";

builder.mutationField("deleteSprint", (t) =>
  t.field({
    type: Sprint,
    args: { id: t.arg({ type: "ID", required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const sprint = await me.sprints.findOne(args.id);

      return sprint.destroy();
    },
  })
);
