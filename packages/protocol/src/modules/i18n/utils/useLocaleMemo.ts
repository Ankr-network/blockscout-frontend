/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useMemo } from 'react';
import { useLocale } from './useLocale';

export const useLocaleMemo = <T = any>(
  memoFn: () => T,
  deps: DependencyList = [],
) => {
  const { locale } = useLocale();

  return useMemo(memoFn, [...deps, locale]);
};
