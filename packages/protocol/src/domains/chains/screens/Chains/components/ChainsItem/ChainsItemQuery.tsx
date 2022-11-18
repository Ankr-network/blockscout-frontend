import { useAddNetworkButton } from 'domains/auth/components/AddNetwork/useAddNetworkButton';
import { IApiChain } from 'domains/chains/api/queryChains';
import { BlockchainType } from 'multirpc-sdk';

import { ChainsItem } from './ChainsItem';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { useChainsItem } from './hooks/useChainsItem';
import { MMChainsItem } from './MMChainsItem';

export const ChainsItemQuery = ({
  isMMIndex,
  chain,
  publicChain,
  chainId,
  timeframe,
  ...props
}: ChainsItemQueryProps) => {
  const [totalRequests, loading, isPremium] = useChainsItem({
    chain,
  });

  const { handleButtonClick } = useAddNetworkButton({
    publicChain: publicChain as IApiChain,
  });

  return (
    <>
      {isMMIndex ? (
        handleButtonClick && (
          <MMChainsItem
            {...props}
            chain={chain}
            isHighlighted={chain.type === BlockchainType.Customized}
            isLoading={loading}
            isPremium={isPremium}
            publicChain={publicChain}
            timeframe={timeframe}
            totalRequests={totalRequests.toString() ?? ''}
          />
        )
      ) : (
        <ChainsItem
          {...props}
          chain={chain}
          isHighlighted={chain.type === BlockchainType.Customized}
          isLoading={loading}
          isPremium={isPremium}
          publicChain={publicChain}
          timeframe={timeframe}
          totalRequests={totalRequests.toString() ?? ''}
        />
      )}
    </>
  );
};
