import { builder } from "../builder";

export const SprintsFilter = builder.enumType("SprintsFilter", {
  values: ["TODAY", "ALL"] as const,
});
