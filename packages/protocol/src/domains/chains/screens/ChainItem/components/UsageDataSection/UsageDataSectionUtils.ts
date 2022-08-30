import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { CountryMap } from 'domains/chains/actions/fetchChainTimeframeData';
import { IS_30D_PRIVATE_STATISTICS_DISABLED } from 'domains/chains/constants/timeframes';

export const useIsRequestsMapVisible = (countries?: CountryMap) => {
  const { isWalletConnected } = useAuth();

  return useMemo(() => {
    if (isWalletConnected) {
      return !IS_30D_PRIVATE_STATISTICS_DISABLED;
    }

    return !!Object.keys(countries || {}).length;
  }, [countries, isWalletConnected]);
};
