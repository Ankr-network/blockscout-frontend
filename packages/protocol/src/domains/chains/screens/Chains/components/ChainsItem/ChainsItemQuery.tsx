import React from 'react';

import { ChainsItem } from './ChainsItem';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { useChainsItem } from './hooks/useChainsItem';

export const ChainsItemQuery = ({
  chain,
  chainId,
  statsTimeframe,
  ...props
}: ChainsItemQueryProps) => {
  const [totalRequests, loading] = useChainsItem({ chain, statsTimeframe });

  return (
    <ChainsItem
      {...props}
      chain={chain}
      isLoading={loading}
      statsTimeframe={statsTimeframe}
      totalRequests={totalRequests.toString() ?? ''}
    />
  );
};
