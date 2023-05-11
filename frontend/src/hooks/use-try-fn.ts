import { useState } from "react";

export const useTryFn = <T, U = void>(
  fn: (input: U) => Promise<T>,
  options?: { onCompleted?: (res: T) => void; onError?: (e?: unknown) => void }
) => {
  const [response, setResponse] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const tryFn = async (input: U) => {
    let res;
    try {
      setLoading(true);

      res = await fn(input);
      setResponse(res);
      setError(undefined);

      if (options?.onCompleted) await options.onCompleted(res);
    } catch (e) {
      setResponse(undefined);
      setError(e);

      if (options?.onError) await options.onError(e);
    } finally {
      setLoading(false);
    }
    return res;
  };

  return [tryFn, { response, loading, error }] as const;
};
