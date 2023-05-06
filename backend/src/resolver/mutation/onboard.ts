import { z } from "zod";

import { User } from "@/datasource";
import { parseAuth, parseSchema } from "@/lib/parse";

import { builder } from "../builder";

const OnboardInput = builder.inputType("OnboardInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    iconPath: t.string({ required: true }),
  }),
});

const OnboardInputSchema = z.object({
  name: z.string().min(1),
  iconPath: z.string(),
});

builder.mutationField("onboard", (t) =>
  t.field({
    type: User,
    args: { input: t.arg({ type: OnboardInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseSchema(OnboardInputSchema, args.input);

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
