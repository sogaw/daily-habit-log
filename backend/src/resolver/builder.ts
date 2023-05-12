import SchemaBuilder from "@pothos/core";
import ValidationPlugin from "@pothos/plugin-validation";

import { BadRequest } from "@/lib/error";
import { logger } from "@/lib/logger";
import { Context } from "@/types";

export const builder = new SchemaBuilder<{ Context: Context }>({
  plugins: [ValidationPlugin],
  validationOptions: {
    validationError: (e) => {
      logger.child({ original: e }).error("zod parse error");
      const fields = Object.fromEntries(e.errors.map((err) => [err.path, err.message]));
      return new BadRequest(undefined, { extensions: { fields } });
    },
  },
});

builder.queryType({});
builder.mutationType({});
