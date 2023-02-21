import {
  ChainsItem,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { usePublicChainsItem } from './hooks/usePublicChainsItem';

export const PublicChainsItem = ({
  chain,
  publicChain,
  chainId,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const { totalRequests, loading } = usePublicChainsItem({
    chain,
    timeframe,
  });

  const { isHighlighted, totalRequestsStr, urls, dummyMessage } =
    useCommonChainsItemData(chain, totalRequests);

  return (
    <ChainsItem
      {...props}
      chain={chain}
      isHighlighted={isHighlighted}
      isLoading={loading}
      publicChain={publicChain}
      totalRequests={totalRequestsStr}
      dummyMessage={dummyMessage}
      urls={urls}
      hasPremiumDialog={chain.premiumOnly}
      timeframe={timeframe}
    />
  );
};
