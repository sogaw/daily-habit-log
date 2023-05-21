import { Auth } from "@/types";

import { BadRequest, Unauthorized } from "./error";
import { logger } from "./logger";

export function parseAuth(auth: Auth | undefined): asserts auth is Auth {
  if (!auth) {
    logger.error("Parsing auth error: Auth is undefined.");
    throw new Unauthorized();
  }
}

export function parseId(id: string | number): asserts id is string {
  if (typeof id != "string") {
    logger.error("Parsing id error: Id is not string.");
    throw new BadRequest();
  }
  if (id.length == 0) {
    logger.error("Parsing id error: Id is empty string.");
    throw new BadRequest();
  }
}
