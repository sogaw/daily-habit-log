import { Tweet } from "@/datasource";
import { parseAuth, parseId } from "@/lib/parse";

import { builder } from "../../builder";

builder.mutationField("deleteTweet", (t) =>
  t.field({
    type: Tweet,
    args: { id: t.arg({ type: "ID", required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);
      parseId(args.id);

      const me = await datasource.users.findOne(auth.uid);
      const tweet = await me.tweets.findOne(args.id);

      return tweet.destroy();
    },
  })
);
