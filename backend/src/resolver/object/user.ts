import { Habit, Sprint, User } from "@/datasource";
import { genDate } from "@/lib/gen";
import { parseId } from "@/lib/parse";
import { getSignedUrl } from "@/lib/storage";

import { builder } from "../builder";
import { SprintsFilter } from "../enum/sprints-filter";
import { PageInfo } from "./page-info";
import { SprintConnection, SprintEdge } from "./sprint";
import { TweetConnection, TweetEdge } from "./tweet";

builder.objectType(User, {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.string({ resolve: (user) => user.data.name }),

    iconUrl: t.string({
      resolve: (user) => {
        const path = user.data.iconPath;
        if (path) return getSignedUrl(path);
      },
      nullable: true,
    }),

    habits: t.field({
      type: [Habit],
      resolve: (user) => user.habits.all(),
    }),

    habit: t.field({
      type: Habit,
      args: { id: t.arg({ type: "ID", required: true }) },
      resolve: (user, args) => {
        parseId(args.id);

        return user.habits.findOne(args.id);
      },
    }),

    sprints: t.field({
      type: SprintConnection,
      args: {
        first: t.arg({ type: "Int" }),
        after: t.arg({ type: "String" }),
        filter: t.arg({ type: SprintsFilter }),
      },
      resolve: async (user, args) => {
        const sprints = await user.sprints.paginate({
          first: args.first || 10,
          after: args.after || genDate().toISOString(),
          filter: args.filter || "ALL",
        });

        const edges = sprints.map(SprintEdge.fromNode);
        const pageInfo = new PageInfo(edges.length == (args.first || 10), edges.at(-1)?.cursor);

        return new SprintConnection(edges, pageInfo);
      },
    }),

    sprint: t.field({
      type: Sprint,
      args: { id: t.arg({ type: "ID", required: true }) },
      resolve: (user, args) => {
        parseId(args.id);

        return user.sprints.findOne(args.id);
      },
    }),

    tweets: t.field({
      type: TweetConnection,
      args: {
        first: t.arg({ type: "Int" }),
        after: t.arg({ type: "String" }),
      },
      resolve: async (user, args) => {
        const tweets = await user.tweets.paginate({
          first: args.first || 10,
          after: args.after || genDate().toISOString(),
        });

        const edges = tweets.map(TweetEdge.fromNode);
        const pageInfo = new PageInfo(edges.length == (args.first || 10), edges.at(-1)?.cursor);

        return new TweetConnection(edges, pageInfo);
      },
    }),
  }),
});
