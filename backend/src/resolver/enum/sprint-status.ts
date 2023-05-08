import { builder } from "../builder";

export const SprintStatus = builder.enumType("SprintStatus", {
  values: ["SUCCESS", "FAILED", "PENDING"] as const,
});
