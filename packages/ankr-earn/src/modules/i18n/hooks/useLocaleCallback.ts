import { DependencyList, useCallback } from 'react';

import { useLocale } from './useLocale';

/**
 * The same as useCallback, but also depends on current locale
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLocaleCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList | undefined,
): T {
  const { locale } = useLocale();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, [...(deps || []), locale]);
}
