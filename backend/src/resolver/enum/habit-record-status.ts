import { builder } from "../builder";

export const HabitRecordStatus = builder.enumType("HabitRecordStatus", {
  values: ["SUCCESS", "FAILED", "PENDING"] as const,
});
