import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import {
  ChainsItem,
  ChainsItemQueryProps,
} from 'domains/chains/components/ChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';

export const PrivateChainsItem = ({
  chain,
  publicChain,
  chainId,
  ...props
}: ChainsItemQueryProps) => {
  const { totalRequests, loading, hasConnectWalletMessage } =
    usePrivateChainsItem({ chain });

  const { isHighlighted, totalRequestsStr, urls, dummyMessage } =
    useCommonChainsItemData(chain, totalRequests, true);

  return (
    <ChainsItem
      {...props}
      dummyMessage={dummyMessage}
      chain={chain}
      isHighlighted={isHighlighted}
      isLoading={loading}
      hasPrivateAccess
      publicChain={publicChain}
      totalRequests={totalRequestsStr}
      hasConnectWalletMessage={hasConnectWalletMessage}
      urls={urls}
    />
  );
};
