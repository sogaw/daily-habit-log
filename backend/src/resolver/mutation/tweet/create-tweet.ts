import { Tweet } from "@/datasource";
import { parseAuth } from "@/lib/parse";

import { builder } from "../../builder";

const CreateTweetInput = builder.inputType("CreateTweetInput", {
  fields: (t) => ({
    content: t.string({ required: true, validate: { minLength: 1 } }),
  }),
});

builder.mutationField("createTweet", (t) =>
  t.field({
    type: Tweet,
    args: { input: t.arg({ type: CreateTweetInput, required: true }) },
    resolve: async (_root, args, { auth, datasource }) => {
      parseAuth(auth);

      const me = await datasource.users.findOne(auth.uid);

      return Tweet.create(me.tweets, {
        content: args.input.content,
      }).save();
    },
  })
);
