import { ZodError } from "zod";

import { Auth } from "@/types";

import { BadRequest, Unauthorized } from "./error";

export function parseAuth(auth: Auth | undefined): asserts auth is Auth {
  if (!auth) throw new Unauthorized();
}

export function parseId(id: string | number): asserts id is string {
  if (typeof id != "string") throw new BadRequest();
}

export function parseSchema<T>(schema: { parse: (data: unknown) => T }, data: unknown): asserts data is T {
  try {
    schema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      const err = Object.fromEntries(e.errors.map((err) => [err.path, err.message]));
      throw new BadRequest(undefined, { extensions: { fields: err } });
    }

    throw new BadRequest();
  }
}
