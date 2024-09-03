import {
  ChainsItemBase,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItemBase';
import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { usePublicChainsItem } from 'domains/chains/screens/ChainsListPage/components/PublicChains/components/PublicChainCard/hooks/usePublicChainsItem';

import { ChainItemLink } from './ChainItemLink';

export const ChainItem = ({
  chain,
  chainId,
  isPublic,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const { loading, totalRequests } = usePublicChainsItem({
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
      isHighlighted={isHighlighted}
      chain={chain}
      totalRequests={totalRequestsStr}
      isLoading={loading}
      chainsItemLink={<ChainItemLink chain={chain} urls={urls} />}
    />
  );
};
