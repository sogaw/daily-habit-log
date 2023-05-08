import { z } from "zod";

const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export const dateSchema = z.string().refine(
  (v) => {
    if (!dateFormat.test(v)) return false;
    if (isNaN(new Date(v).getTime())) return false;
    return true;
  },
  { message: "Invalid date format, expected yyyy-MM-dd" }
);
