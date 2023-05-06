import { Auth } from "@/types";

import { BadRequest, Unauthorized } from "./error";

export function parseAuth(auth: Auth | undefined): asserts auth is Auth {
  if (!auth) throw new Unauthorized();
}

export function parseId(id: string | number): asserts id is string {
  if (typeof id != "string") throw new BadRequest();
}
