import { builder } from "../builder";
import { PageInfo } from "./page-info";
import { TweetEdge } from "./tweet-edge";

export class TweetConnection {
  constructor(public edges: TweetEdge[], public pageInfo: PageInfo) {}
}

builder.objectType(TweetConnection, {
  name: "TweetConnection",
  fields: (t) => ({
    edges: t.field({ type: [TweetEdge], resolve: (p) => p.edges }),
    pageInfo: t.field({ type: PageInfo, resolve: (p) => p.pageInfo }),
  }),
});
