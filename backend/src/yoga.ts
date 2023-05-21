import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { printSchema } from "graphql";
import { createYoga, useLogger } from "graphql-yoga";

import { builder, createAuthContext, createDatasourceContext } from "@/resolver";

import { logger } from "./lib/logger";
import { Context } from "./types";

type LogFnParams = {
  args?: {
    contextValue?: {
      params?: {
        operationName: unknown;
        variables: unknown;
        query: unknown;
      };
    };
  };
};

export const yoga = createYoga({
  schema: builder.toSchema(),
  context: async ({ request }): Promise<Context> => {
    const auth = await createAuthContext({ request });
    const datasource = createDatasourceContext();
    return { auth, datasource };
  },
  logging: {
    debug: (...args) => {
      if (process.env.NODE_ENV != "development") return;
      logger.debug("[GraphQL] " + args.reduce((prev, curr) => prev + "." + curr));
    },
    info: (...args) => {
      logger.info("[GraphQL] " + args.reduce((prev, curr) => prev + "." + curr));
    },
    warn: (...args) => {
      logger.warn("[GraphQL] " + args.reduce((prev, curr) => prev + "." + curr));
    },
    error: (...args) => {
      logger.error("[GraphQL] " + args.reduce((prev, curr) => prev + "." + curr));
    },
  },
  plugins: [
    useLogger({
      logFn: (message, params: LogFnParams) => {
        if (process.env.NODE_ENV != "development") return;
        if (message != "execute-start") return;

        const { operationName, variables, query } = params?.args?.contextValue?.params || {};
        const fmt = (input: unknown) => JSON.stringify(input, null, 2);

        logger.debug(`[GraphQL] Operation name:\n${operationName}`);
        logger.debug(`[GraphQL] Query:\n${query}`);
        logger.debug(`[GraphQL] Variables:\n${fmt(variables)}`);
      },
    }),
  ],
});

export const createSchema = () => {
  writeFileSync(join(__dirname, "schema.graphql"), printSchema(builder.toSchema({ sortSchema: false })) + "\n");
};
