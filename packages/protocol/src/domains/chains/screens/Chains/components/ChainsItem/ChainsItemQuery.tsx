import { BlockchainType } from 'multirpc-sdk';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { useQueryChainsItem } from './hooks/useQueryChainsItem';
import { ChainsItem } from './ChainsItem';
import { useAddNetworkButton } from 'domains/auth/components/AddNetwork/useAddNetworkButton';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MMChainsItem } from '../MMChainsItem/MMChainsItem';
import { useChainsItem } from '../../hooks/useChainsItem';
import { useMemo } from 'react';

export const ChainsItemQuery = ({
  isMMIndex,
  chain,
  publicChain,
  chainId,
  ...props
}: ChainsItemQueryProps) => {
  const [totalRequests, loading, isPremium] = useQueryChainsItem({
    chain,
  });
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

  const { urls } = useChainsItem(chain, isPremium);

  return (
    <>
      {isMMIndex && handleButtonClick && (
        <MMChainsItem
          {...props}
          chain={chain}
          isHighlighted={isHighlighted}
          isLoading={loading}
          isPremium={isPremium}
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
          isPremium={isPremium}
          publicChain={publicChain}
          totalRequests={totalRequestsStr}
          urls={urls}
        />
      )}
    </>
  );
};
