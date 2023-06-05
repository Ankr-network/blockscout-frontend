import {
  ChainsItemBase,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItemBase';
import { ChainItemLink } from './ChainItemLink';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainCard/hooks/usePublicChainsItem';

export const ChainItem = ({
  chain,
  chainId,
  timeframe,
  isPublic,
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
      isHighlighted={isHighlighted}
      chain={chain}
      totalRequests={totalRequestsStr}
      isLoading={loading}
      chainsItemLink={<ChainItemLink chain={chain} urls={urls} />}
    />
  );
};
