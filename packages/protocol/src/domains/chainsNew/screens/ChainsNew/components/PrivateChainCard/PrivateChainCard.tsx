import { usePrivateChainsItem } from 'domains/chains/screens/Chains/components/PrivateChains/components/PrivateChainsItem/hooks/usePrivateChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { BaseChainsCard } from '../BaseChainsCard';
import { IChainCardProps } from '../PublicChainCard';

export const PrivateChainCard = ({ chain, ...props }: IChainCardProps) => {
  const { totalRequests, loading } = usePrivateChainsItem({ chain });

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  return (
    <BaseChainsCard
      chain={chain}
      totalRequests={totalRequestsStr}
      loading={Boolean(loading)}
      {...props}
    />
  );
};
