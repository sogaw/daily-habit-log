import SchemaBuilder from "@pothos/core";
import ComplexityPlugin from "@pothos/plugin-complexity";
import ValidationPlugin from "@pothos/plugin-validation";

import { BadRequest } from "@/lib/error";
import { logger } from "@/lib/logger";
import { Context } from "@/types";

export const builder = new SchemaBuilder<{ Context: Context }>({
  plugins: [ComplexityPlugin, ValidationPlugin],
  complexity: {
    defaultComplexity: 1,
    defaultListMultiplier: 10,
    limit: {
      complexity: 1_000,
      depth: 10,
      breadth: 50,
    },
  },
  validationOptions: {
    validationError: (e) => {
      logger.child({ original: e }).error("Zod parsing failed.");
      const fields = Object.fromEntries(e.errors.map((err) => [err.path, err.message]));
      return new BadRequest(undefined, { extensions: { fields } });
    },
  },
});

builder.queryType({});
builder.mutationType({});
