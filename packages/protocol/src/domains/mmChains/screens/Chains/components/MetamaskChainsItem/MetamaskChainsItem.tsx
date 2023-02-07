import { ChainsItemQueryProps } from 'domains/chains/components/ChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { ChainsItemBase } from 'domains/chains/components/ChainsItemBase';
import { MetamaskChainsItemLink } from './MetamaskChainsItemLink';
import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainsItem/hooks/usePublicChainsItem';
import { useHandleClick } from './MetamaskChainsItemUtils';

export const MetamaskChainsItem = ({
  chain,
  publicChain,
  chainId,
  ...props
}: ChainsItemQueryProps) => {
  const { totalRequests, loading } = usePublicChainsItem({
    chain,
  });

  const { isHighlighted, totalRequestsStr, urls } = useCommonChainsItemData(
    chain,
    totalRequests,
  );

  const handleClick = useHandleClick();

  return (
    <ChainsItemBase
      {...props}
      isHighlighted={isHighlighted}
      chain={chain}
      handleOriginUrlClick={handleClick}
      totalRequests={totalRequestsStr}
      isLoading={loading}
      chainsItemLink={
        <MetamaskChainsItemLink publicChain={publicChain} urls={urls} />
      }
    />
  );
};
