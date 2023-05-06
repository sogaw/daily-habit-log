import { User } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../builder";

const OnboardInput = builder.inputType("OnboardInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    iconPath: t.string({ required: true }),
  }),
});

builder.mutationField("onboard", (t) =>
  t.field({
    type: User,
    args: { input: t.arg({ type: OnboardInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const user = User.create(datasource.users, {
        id: auth.uid,
        name: args.input.name,
        iconPath: args.input.iconPath,
      });
      await user.save();

      return user;
    },
  })
);
