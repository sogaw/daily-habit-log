import { User } from "@/datasource";
import { parseAuth } from "@/lib/parse";
import { deleteFile } from "@/lib/storage";

import { builder } from "../../builder";

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

      const me = await datasource.users.findOne(auth.uid);

      if (!args.input.iconPath && me.data.iconPath) await deleteFile(me.data.iconPath);

      return me.update({ name: args.input.name, iconPath: args.input.iconPath }).save();
    },
  })
);
