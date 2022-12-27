import { useMemo } from 'react';

import { BlockchainType } from 'multirpc-sdk';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { useQueryChainsItem } from './hooks/useQueryChainsItem';
import { ChainsItem } from './ChainsItem';
import { useAddNetworkButton } from 'domains/auth/components/AddNetwork/useAddNetworkButton';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MMChainsItem } from '../MMChainsItem/MMChainsItem';
import { useChainsItem } from '../../hooks/useChainsItem';

export const ChainsItemQuery = ({
  isMMIndex,
  chain,
  publicChain,
  chainId,
  ...props
}: ChainsItemQueryProps) => {
  const [totalRequests, loading, hasPrivateAccess, hasConnectWalletMessage] =
    useQueryChainsItem({ chain, isMMIndex });

  const isHighlighted = useMemo(
    () => chain.type === BlockchainType.Customized,
    [chain.type],
  );

  const totalRequestsStr = useMemo(
    () => totalRequests.toString() ?? '',
    [totalRequests],
  );

  const { handleButtonClick } = useAddNetworkButton({
    publicChain: publicChain as IApiChain,
  });

  const { urls } = useChainsItem(chain, hasPrivateAccess);

  return (
    <>
      {isMMIndex && handleButtonClick && (
        <MMChainsItem
          {...props}
          chain={chain}
          isHighlighted={isHighlighted}
          isLoading={loading}
          hasPrivateAccess={hasPrivateAccess}
          publicChain={publicChain}
          totalRequests={totalRequestsStr}
          urls={urls}
        />
      )}
      {!isMMIndex && (
        <ChainsItem
          {...props}
          chain={chain}
          isHighlighted={isHighlighted}
          isLoading={loading}
          hasPrivateAccess={hasPrivateAccess}
          publicChain={publicChain}
          totalRequests={totalRequestsStr}
          hasConnectWalletMessage={hasConnectWalletMessage}
          urls={urls}
        />
      )}
    </>
  );
};
