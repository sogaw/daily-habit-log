import { builder } from "../builder";
import { PageInfo } from "./page-info";
import { SprintEdge } from "./sprint-edge";

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
