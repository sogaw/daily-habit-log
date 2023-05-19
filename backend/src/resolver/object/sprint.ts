import { startOfDay } from "date-fns";

import { Sprint } from "@/datasource";
import { DateFromISO } from "@/lib/date";
import { genDate } from "@/lib/gen";

import { builder } from "../builder";
import { SprintStatus } from "../enum/sprint-status";
import { PageInfo } from "./page-info";

builder.objectType(Sprint, {
  name: "Sprint",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.string({ resolve: (sprint) => sprint.data.name }),
    description: t.string({ resolve: (sprint) => sprint.data.description }),
    status: t.field({ type: SprintStatus, resolve: (sprint) => sprint.data.status }),
    active: t.boolean({ resolve: (sprint) => sprint.data.createdAt.toDate() > startOfDay(genDate()) }),
    createdAt: t.string({ resolve: (sprint) => sprint.data.createdAt.toDate().toISOString() }),
    createdOn: t.string({ resolve: (sprint) => DateFromISO(sprint.data.createdAt.toDate().toISOString()) }),
  }),
});

export class SprintEdge {
  constructor(public cursor: string, public node: Sprint) {}

  static fromNode(node: Sprint) {
    return new SprintEdge(node.data.createdAt.toDate().toISOString(), node);
  }
}

builder.objectType(SprintEdge, {
  name: "SprintEdge",
  fields: (t) => ({
    cursor: t.exposeString("cursor"),
    node: t.field({ type: Sprint, resolve: (edge) => edge.node }),
  }),
});

export class SprintConnection {
  constructor(public edges: SprintEdge[], public pageInfo: PageInfo) {}
}

builder.objectType(SprintConnection, {
  name: "SprintConnection",
  fields: (t) => ({
    edges: t.field({ type: [SprintEdge], resolve: (p) => p.edges }),
    pageInfo: t.field({ type: PageInfo, resolve: (p) => p.pageInfo }),
  }),
});
