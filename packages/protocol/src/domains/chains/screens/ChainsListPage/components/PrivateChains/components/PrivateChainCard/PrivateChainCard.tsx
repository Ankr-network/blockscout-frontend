import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';

import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import { ComingSoonChainCard } from '../../../ComingSoonChainCard';
import { PremiumOnlyChainCard } from '../../../PremiumOnlyChainCard';

interface PrivateChainCardProps extends IChainCardProps {
  hasPremium: boolean;
  hasTotalRequestsLabel?: boolean;
}

export const PrivateChainCard = ({
  chain,
  hasPremium,
  ...props
}: PrivateChainCardProps) => {
  const { loading, totalRequests } = usePrivateChainsItem({ chain });

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  const { isComingSoon, premiumOnly } = chain;

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    totalRequests: totalRequestsStr,
    ...props,
  };

  if (isComingSoon) {
    return <ComingSoonChainCard {...cardProps} />;
  }

  if (premiumOnly && !hasPremium) {
    return <PremiumOnlyChainCard {...cardProps} />;
  }

  return <BaseChainsCard {...cardProps} />;
};
