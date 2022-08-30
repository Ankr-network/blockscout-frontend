import { useAuth } from 'domains/auth/hooks/useAuth';
import { CountryMap } from 'domains/chains/actions/fetchChainTimeframeData';
import { useMemo } from 'react';

export const useIsRequestsMapVisible = (countries?: CountryMap) => {
  const { isWalletConnected } = useAuth();

  return useMemo(
    () =>
      Boolean(
        isWalletConnected || (countries && Object.keys(countries).length),
      ),
    [countries, isWalletConnected],
  );
};
