import { GraphQLError, GraphQLErrorOptions } from "graphql";

const mergeExtensionsCode = (code: string, options?: GraphQLErrorOptions) => ({
  ...options,
  extensions: {
    ...{ code },
    ...options?.extensions,
  },
});

export class BadRequest extends GraphQLError {
  constructor(message = "Bad Request", options?: GraphQLErrorOptions) {
    super(message, mergeExtensionsCode("BAD_REQUEST", options));
  }
}

export class Unauthorized extends GraphQLError {
  constructor(message = "Unauthorized", options?: GraphQLErrorOptions) {
    super(message, mergeExtensionsCode("UNAUTHORIZED", options));
  }
}

export class Forbidden extends GraphQLError {
  constructor(message = "Forbidden", options?: GraphQLErrorOptions) {
    super(message, mergeExtensionsCode("FORBIDDEN", options));
  }
}

export class NotFound extends GraphQLError {
  constructor(message = "Not Found", options?: GraphQLErrorOptions) {
    super(message, mergeExtensionsCode("NOTE_FOUND", options));
  }
}

export class InternalServerError extends GraphQLError {
  constructor(message = "Internal Server Error", options?: GraphQLErrorOptions) {
    super(message, mergeExtensionsCode("INTERNAL_SERVER_ERROR", options));
  }
}
