import { Sprint } from "@/datasource/fire-model/sprint";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../builder";
import { SprintStatus } from "../enum/sprint-status";

const UpdateSprintStatusInput = builder.inputType("UpdateSprintStatusInput", {
  fields: (t) => ({
    status: t.field({ type: SprintStatus, required: true }),
  }),
});

builder.mutationField("updateSprintStatus", (t) =>
  t.field({
    type: Sprint,
    args: {
      id: t.arg({ type: "ID", required: true }),
      input: t.arg({ type: UpdateSprintStatusInput, required: true }),
    },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const sprint = await me.sprints.findOne(args.id);

      return sprint
        .updateStatus({
          status: args.input.status,
        })
        .save();
    },
  })
);
