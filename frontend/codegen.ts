import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/src/schema.graphql",
  documents: "src/**/*.{graphql,js,ts,jsx,tsx}",
  generates: {
    "src/generated/gql/": {
      preset: "client",
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
