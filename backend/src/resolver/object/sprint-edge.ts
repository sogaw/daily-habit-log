import { Sprint } from "@/datasource";

import { builder } from "../builder";

export class SprintEdge {
  constructor(public cursor: string, public node: Sprint) {}
}

builder.objectType(SprintEdge, {
  name: "SprintEdge",
  fields: (t) => ({
    cursor: t.exposeString("cursor"),
    node: t.field({ type: Sprint, resolve: (edge) => edge.node }),
  }),
});
