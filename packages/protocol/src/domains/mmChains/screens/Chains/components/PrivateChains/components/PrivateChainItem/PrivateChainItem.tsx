import {
  ChainsItemBase,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItemBase';
import { usePrivateChainsItem } from 'domains/chains/screens/Chains/components/PrivateChains/components/PrivateChainCard/hooks/usePrivateChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';

import { ChainItemLink } from '../../../ChainItem/ChainItemLink';

export const PrivateChainItem = ({
  chain,
  chainId,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const { loading, totalRequests } = usePrivateChainsItem({ chain });

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
