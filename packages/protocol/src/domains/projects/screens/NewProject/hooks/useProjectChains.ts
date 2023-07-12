import { useMemo } from 'react';

import { usePrivateChainsInfo } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsInfo';
import { ChainID } from 'domains/chains/types';

const AVAILABLE_PROJECT_CHAINS_IDS = [
  ChainID.ETH,
  ChainID.GNOSIS,
  ChainID.POLYGON,
  ChainID.BSC,
  ChainID.ARBITRUM,
];

export const useProjectChains = () => {
  const [chains = [], allChains, isLoading] = usePrivateChainsInfo();

  const projectChains = useMemo(
    () =>
      chains.filter(chain => AVAILABLE_PROJECT_CHAINS_IDS.includes(chain.id)),
    [chains],
  );

  return {
    projectChains,
    allChains,
    isLoading,
  };
};
