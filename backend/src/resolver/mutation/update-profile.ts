import { z } from "zod";

import { genTimestamp, User } from "@/datasource";
import { parseAuth, parseSchema } from "@/lib/parse";
import { deleteFile } from "@/lib/storage";

import { builder } from "../builder";

const UpdateProfileInput = builder.inputType("UpdateProfileInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    iconPath: t.string(),
  }),
});

const UpdateProfileInputSchema = z.object({
  name: z.string().min(1),
  iconPath: z.string().min(1).optional().nullable(),
});

builder.mutationField("updateProfile", (t) =>
  t.field({
    type: User,
    args: { input: t.arg({ type: UpdateProfileInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseSchema(UpdateProfileInputSchema, args.input);

      const user = await datasource.users.findOne(auth.uid);

      if (!args.input.iconPath && user.data.iconPath) await deleteFile(user.data.iconPath);

      user.update({ name: args.input.name, iconPath: args.input.iconPath || null, updatedAt: genTimestamp() });

      await user.save();

      return user;
    },
  })
);
