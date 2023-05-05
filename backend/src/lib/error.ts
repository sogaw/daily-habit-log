import { GraphQLError, GraphQLErrorOptions } from "graphql";

export class BadRequest extends GraphQLError {
  constructor(message = "Bad Request", options?: GraphQLErrorOptions) {
    super(message, options);
  }
}

export class Unauthorized extends GraphQLError {
  constructor(message = "Unauthorized", options?: GraphQLErrorOptions) {
    super(message, options);
  }
}

export class Forbidden extends GraphQLError {
  constructor(message = "Forbidden", options?: GraphQLErrorOptions) {
    super(message, options);
  }
}

export class NotFound extends GraphQLError {
  constructor(message = "Not Found", options?: GraphQLErrorOptions) {
    super(message, options);
  }
}

export class InternalServerError extends GraphQLError {
  constructor(message = "Internal Server Error", options?: GraphQLErrorOptions) {
    super(message, options);
  }
}
