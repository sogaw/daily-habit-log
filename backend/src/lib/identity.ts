export class Identity<T> {
  constructor(private value: T) {}

  static of<T>(value: T): Identity<T> {
    return new Identity(value);
  }

  andThen<U>(transform: (value: T) => Identity<U>): Identity<U> {
    return transform(this.value);
  }

  map<U>(transform: (value: T) => U): Identity<U> {
    return Identity.of(transform(this.value));
  }

  unwrap(): T {
    return this.value;
  }
}
