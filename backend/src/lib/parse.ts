import { Auth } from "@/types";

import { BadRequest, Unauthorized } from "./error";

export function parseAuth(auth: Auth | undefined): asserts auth is Auth {
  if (!auth) {
    console.error("parseAuth error. auth is undefined.");
    throw new Unauthorized();
  }
}

export function parseId(id: string | number): asserts id is string {
  if (typeof id != "string") {
    console.error("parseId error. id is not string.");
    throw new BadRequest();
  }
}
