import { HabitRecord } from "@/datasource";

import { builder } from "../builder";
import { HabitRecordStatus } from "../enum/habit-record-status";

builder.objectType(HabitRecord, {
  name: "HabitRecord",
  fields: (t) => ({
    id: t.exposeID("id"),
    date: t.string({ resolve: (noteHistory) => noteHistory.data.date }),
    status: t.field({ type: HabitRecordStatus, resolve: (noteHistory) => noteHistory.data.status }),
  }),
});
