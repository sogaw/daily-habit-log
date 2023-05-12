import { Tweet } from "@/datasource";
import { formatDateTime } from "@/lib/date";

import { builder } from "../builder";

builder.objectType(Tweet, {
  name: "Tweet",
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.string({ resolve: (tweet) => tweet.data.content }),
    createdAt: t.string({ resolve: (tweet) => tweet.data.createdAt.toDate().toISOString() }),
    formattedCreatedAt: t.string({ resolve: (tweet) => formatDateTime(tweet.data.createdAt) }),
  }),
});
