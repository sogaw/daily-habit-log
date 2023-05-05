import { HabitRecord } from "@/datasource";

import { builder } from "../builder";

builder.objectType(HabitRecord, {
  name: "HabitRecord",
  fields: (t) => ({
    id: t.exposeID("id"),
    date: t.string({ resolve: (noteHistory) => noteHistory.data.date }),
    status: t.string({ resolve: (noteHistory) => noteHistory.data.status }),
  }),
});
