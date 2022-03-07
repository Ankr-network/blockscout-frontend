import { DependencyList, useMemo } from 'react';

import { useLocale } from './useLocale';

function useLocaleMemo<T = unknown>(
  memoFn: () => T,
  deps: DependencyList | undefined,
): T {
  const { locale } = useLocale();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(memoFn, [...(deps || []), locale]);
}

export { useLocaleMemo };
