import { startOfDay } from "date-fns";

import { Sprint } from "@/datasource";
import { DateFromISO } from "@/lib/date";
import { genDate } from "@/lib/gen";

import { builder } from "../builder";
import { SprintStatus } from "../enum/sprint-status";

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
