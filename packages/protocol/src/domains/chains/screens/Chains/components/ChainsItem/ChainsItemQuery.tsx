import { BlockchainType } from 'multirpc-sdk';

import { ChainsItem } from './ChainsItem';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { useChainsItem } from './hooks/useChainsItem';

export const ChainsItemQuery = ({
  chain,
  publicChain,
  chainId,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const [totalRequests, loading, isPremium] = useChainsItem({
    chain,
    timeframe,
  });

  return (
    <ChainsItem
      {...props}
      chain={chain}
      isHighlighted={chain.type === BlockchainType.Customized}
      isLoading={loading}
      isPremium={isPremium}
      publicChain={publicChain}
      timeframe={timeframe}
      totalRequests={totalRequests.toString() ?? ''}
    />
  );
};
