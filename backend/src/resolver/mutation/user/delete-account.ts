import { deleteAuth } from "@/lib/auth";
import { Forbidden } from "@/lib/error";
import { parseAuth } from "@/lib/parse";
import { deleteFileRecursive } from "@/lib/storage";

import { builder } from "../../builder";

builder.mutationField("deleteAccount", (t) =>
  t.field({
    type: "ID",
    resolve: async (_root, _args, { auth, datasource }) => {
      parseAuth(auth);

      // NOTE: this is user-1@example.com in production
      if (auth.uid == "dGN8rddUl9MzXe9dbiRCZYh4XGL2") throw new Forbidden();

      await deleteAuth(auth);
      await deleteFileRecursive(`users/${auth.uid}`);
      await datasource.users.findOne(auth.uid).then((u) => u.recursiveDestroy());

      return auth.uid;
    },
  })
);
