import { ChainsItemBase } from 'domains/chains/components/ChainsItemBase';
import { ChainsItemQueryProps } from 'domains/chains/components/ChainsItem';
import { MetamaskChainsItemLink } from './MetamaskChainsItemLink';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainsItem/hooks/usePublicChainsItem';

export const MetamaskChainsItem = ({
  chain,
  chainId,
  publicChain,
  ...props
}: ChainsItemQueryProps) => {
  const { totalRequests, loading } = usePublicChainsItem({
    chain,
  });

  const { isHighlighted, totalRequestsStr, urls } = useCommonChainsItemData(
    chain,
    totalRequests,
  );

  return (
    <ChainsItemBase
      {...props}
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
