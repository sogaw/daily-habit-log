import { z } from "zod";

import { genTimestamp, User } from "@/datasource";
import { parseAuth, parseSchema } from "@/lib/parse";

import { builder } from "../builder";

const OnboardInput = builder.inputType("OnboardInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    iconPath: t.string(),
  }),
});

const OnboardInputSchema = z.object({
  name: z.string().min(1),
  iconPath: z.string().min(1).optional().nullable(),
});

builder.mutationField("onboard", (t) =>
  t.field({
    type: User,
    args: { input: t.arg({ type: OnboardInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseSchema(OnboardInputSchema, args.input);

      const now = genTimestamp();
      const user = User.create(datasource.users, auth.uid, {
        id: auth.uid,
        name: args.input.name,
        iconPath: args.input.iconPath || null,
        createdAt: now,
        updatedAt: now,
      });

      await user.save();

      return user;
    },
  })
);
