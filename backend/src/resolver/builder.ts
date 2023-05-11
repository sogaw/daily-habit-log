import SchemaBuilder from "@pothos/core";
import ValidationPlugin from "@pothos/plugin-validation";

import { BadRequest } from "@/lib/error";
import { Context } from "@/types";

export const builder = new SchemaBuilder<{ Context: Context }>({
  plugins: [ValidationPlugin],
  validationOptions: {
    validationError: (e) => {
      console.error("zod error.");
      console.error(e);
      const fields = Object.fromEntries(e.errors.map((err) => [err.path, err.message]));
      return new BadRequest(undefined, { extensions: { fields } });
    },
  },
});

builder.queryType({});
builder.mutationType({});
