import { Sprint } from "@/datasource";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../builder";

const UpdateSprintInput = builder.inputType("UpdateSprintInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField("updateSprint", (t) =>
  t.field({
    type: Sprint,
    args: { id: t.arg({ type: "ID", required: true }), input: t.arg({ type: UpdateSprintInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const sprint = await me.sprints.findOne(args.id);

      return sprint
        .update({
          name: args.input.name,
          description: args.input.description,
        })
        .save();
    },
  })
);
