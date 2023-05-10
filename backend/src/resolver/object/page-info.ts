import { builder } from "../builder";

export class PageInfo {
  constructor(public hasNextPage: boolean, public endCursor: string | undefined) {}
}

builder.objectType(PageInfo, {
  name: "PageInfo",
  fields: (t) => ({
    hasNextPage: t.exposeBoolean("hasNextPage"),
    endCursor: t.exposeString("endCursor", { nullable: true }),
  }),
});
