import { Tweet } from "@/datasource";

import { builder } from "../builder";

export class TweetEdge {
  constructor(public cursor: string, public node: Tweet) {}
}

builder.objectType(TweetEdge, {
  name: "TweetEdge",
  fields: (t) => ({
    cursor: t.exposeString("cursor"),
    node: t.field({ type: Tweet, resolve: (edge) => edge.node }),
  }),
});
