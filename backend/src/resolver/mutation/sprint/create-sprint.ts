import { Sprint } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../../builder";

const CreateSprintInput = builder.inputType("CreateSprintInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField("createSprint", (t) =>
  t.field({
    type: Sprint,
    args: { input: t.arg({ type: CreateSprintInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const me = await datasource.users.findOne(auth.uid);

      return Sprint.create(me.sprints, {
        name: args.input.name,
        description: args.input.description,
        userId: me.id,
      }).save();
    },
  })
);
