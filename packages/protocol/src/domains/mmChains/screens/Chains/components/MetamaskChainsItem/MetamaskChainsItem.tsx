import { ChainsItemBase } from 'domains/chains/components/ChainsItemBase';
import { ChainsItemQueryProps } from 'domains/chains/components/ChainsItem';
import { MetamaskChainsItemLink } from './MetamaskChainsItemLink';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainCard/hooks/usePublicChainsItem';

export const MetamaskChainsItem = ({
  chain,
  chainId,
  timeframe,
  publicChain,
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
      chainsItemLink={
        <MetamaskChainsItemLink publicChain={publicChain} urls={urls} />
      }
    />
  );
};
