import {
  ChainsItemBase,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItemBase';
import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainCard/hooks/usePublicChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';

import { ChainItemLink } from '../../../ChainItem/ChainItemLink';

export const PublicChainItem = ({
  chain,
  chainId,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const { totalRequests, loading } = usePublicChainsItem({
    chain,
    timeframe,
  });

  const { isHighlighted, totalRequestsStr, urls } = useCommonChainsItemData(
    chain,
    totalRequests,
  );

  return (
    <ChainsItemBase
      {...props}
      timeframe={timeframe}
      totalRequests={totalRequestsStr}
      isHighlighted={isHighlighted}
      chain={chain}
      isLoading={loading}
      chainsItemLink={<ChainItemLink chain={chain} urls={urls} />}
    />
  );
};
