import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import { ComingSoonChainCard } from '../../../ComingSoonChainCard';

export const PrivateChainCard = ({ chain, ...props }: IChainCardProps) => {
  const { totalRequests, loading } = usePrivateChainsItem({ chain });

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  const { isComingSoon } = chain;

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    totalRequests: totalRequestsStr,
    ...props,
  };

  if (isComingSoon) {
    return <ComingSoonChainCard {...cardProps} />;
  }

  return <BaseChainsCard {...cardProps} />;
};
