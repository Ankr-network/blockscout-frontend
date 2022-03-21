export const debouncePromise = <T extends (...args: any[]) => void>(
  inner: T,
  ms = 0,
): ((...args: any[]) => Promise<T>) => {
  let timer: NodeJS.Timeout;
  let resolves: ((value: any) => void)[] = [];

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const result = inner(...args);
      resolves.forEach(r => r(result));
      resolves = [];
    }, ms);

    return new Promise(r => resolves.push(r));
  };
};
