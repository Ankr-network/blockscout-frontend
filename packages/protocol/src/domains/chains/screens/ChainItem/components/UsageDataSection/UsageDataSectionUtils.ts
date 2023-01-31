import { useMemo } from 'react';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';

export const useIsRequestsMapVisible = (countries?: CountryMap) => {
  return useMemo(() => !!Object.keys(countries || {}).length, [countries]);
};
