import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { printSchema } from "graphql";
import { createYoga } from "graphql-yoga";

import { authContext, builder, datasourceContext } from "@/resolver";

import { Context } from "./types";

export const yoga = createYoga({
  schema: builder.toSchema(),
  context: async ({ request }): Promise<Context> => {
    const auth = await authContext({ request });
    const datasource = datasourceContext();

    return { auth, datasource };
  },
});

export const createSchema = () => {
  writeFileSync(join(__dirname, "schema.graphql"), printSchema(builder.toSchema({ sortSchema: false })) + "\n");
};
