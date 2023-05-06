import { User } from "@/datasource";
import { parseAuth } from "@/lib/parse";
import { deleteFile } from "@/lib/storage";

import { builder } from "../builder";

const UpdateProfileInput = builder.inputType("UpdateProfileInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1 } }),
    iconPath: t.string({ required: true }),
  }),
});

builder.mutationField("updateProfile", (t) =>
  t.field({
    type: User,
    args: { input: t.arg({ type: UpdateProfileInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const user = await datasource.users.findOne(auth.uid);

      if (!args.input.iconPath && user.data.iconPath) await deleteFile(user.data.iconPath);

      return user.update({ name: args.input.name, iconPath: args.input.iconPath }).save();
    },
  })
);
