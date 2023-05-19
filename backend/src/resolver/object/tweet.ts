import { Tweet } from "@/datasource";
import { formatDateTime } from "@/lib/date";

import { builder } from "../builder";
import { PageInfo } from "./page-info";

builder.objectType(Tweet, {
  name: "Tweet",
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.string({ resolve: (tweet) => tweet.data.content }),
    createdAt: t.string({ resolve: (tweet) => tweet.data.createdAt.toDate().toISOString() }),
    formattedCreatedAt: t.string({ resolve: (tweet) => formatDateTime(tweet.data.createdAt) }),
  }),
});

export class TweetEdge {
  constructor(public cursor: string, public node: Tweet) {}

  static fromNode(node: Tweet) {
    return new TweetEdge(node.data.createdAt.toDate().toISOString(), node);
  }
}

builder.objectType(TweetEdge, {
  name: "TweetEdge",
  fields: (t) => ({
    cursor: t.exposeString("cursor"),
    node: t.field({ type: Tweet, resolve: (edge) => edge.node }),
  }),
});

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
