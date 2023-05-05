import { useState } from "react";

export const useTryFn = <T = void>(
  fn: (input: T) => void,
  options?: { onCompleted?: () => void; onError?: (e?: unknown) => void }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const tryFn = async (input: T) => {
    try {
      setLoading(true);
      await fn(input);
      setError(undefined);
      if (options?.onCompleted) await options.onCompleted();
    } catch (e) {
      setError(e);
      if (options?.onError) await options.onError(e);
    } finally {
      setLoading(false);
    }
  };

  return [tryFn, { loading, error }] as const;
};
