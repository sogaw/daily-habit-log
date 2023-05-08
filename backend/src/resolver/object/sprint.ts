import { Sprint } from "@/datasource/fire-model/sprint";
import { FormatDate } from "@/lib/date";

import { builder } from "../builder";
import { SprintStatus } from "../enum/sprint-status";

builder.objectType(Sprint, {
  name: "Sprint",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.string({ resolve: (sprint) => sprint.data.name }),
    description: t.string({ resolve: (sprint) => sprint.data.description }),
    status: t.field({ type: SprintStatus, resolve: (sprint) => sprint.data.status }),
    createdAt: t.string({ resolve: (sprint) => FormatDate(sprint.data.createdAt) }),
  }),
});
