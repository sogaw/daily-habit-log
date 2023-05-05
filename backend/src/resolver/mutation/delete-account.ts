import { deleteAuth } from "@/lib/auth";
import { parseAuth } from "@/lib/parse";
import { deleteFileRecursive } from "@/lib/storage";

import { builder } from "../builder";

builder.mutationField("deleteAccount", (t) =>
  t.field({
    type: "ID",
    resolve: async (_root, _args, { auth, datasource }) => {
      parseAuth(auth);

      await deleteAuth(auth);
      await deleteFileRecursive(`users/${auth.uid}`);
      await datasource.users.findOne(auth.uid).then((u) => u.recursiveDestroy());

      return auth.uid;
    },
  })
);
