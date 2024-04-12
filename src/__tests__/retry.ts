/**
 * Stops execution for {@link milliseconds} milliseconds.
 */
export async function milliseconds(milliseconds: number): Promise<void> {
  await new Promise((_) => setTimeout(_, milliseconds));
}

/**
 * Executes the function {@link fn}, retrying if it throws an error.
 * Uses a linear strategy by retrying each {@link delayMs} milliseconds.
 * If {@link maxAttempts} is reached, it throws the error returned by {@link fn} last execution.
 */
export async function retry(
  fn: () => void,
  maxAttempts: number = 4,
  delayMs: number = 1000,
): Promise<void> {
  let attempt = 1;
  const execute = async (): Promise<void> => {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }
    }

    await milliseconds(delayMs);
    attempt++;
    return execute();
  };
  return execute();
}
