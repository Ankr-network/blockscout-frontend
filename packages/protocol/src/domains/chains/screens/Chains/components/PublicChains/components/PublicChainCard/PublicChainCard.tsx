import { usePublicChainsItem } from './hooks/usePublicChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { Timeframe, Chain } from 'domains/chains/types';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { PremiumOnlyChainCard } from '../../../PremiumOnlyChainCard';
import { ComingSoonChainCard } from '../../../ComingSoonChainCard';

export interface IChainCardProps {
  chain: Chain;
  timeframe: Timeframe;
}

export const PublicChainCard = ({
  chain,
  timeframe,
  ...props
}: IChainCardProps) => {
  const { totalRequests, loading = false } = usePublicChainsItem({
    chain,
    timeframe,
  });

  const { totalRequestsStr } = useCommonChainsItemData(chain, totalRequests);
  const { premiumOnly, isComingSoon } = chain;

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    timeframe,
    totalRequests: totalRequestsStr,
    ...props,
  };

  if (isComingSoon) {
    return <ComingSoonChainCard {...cardProps} />;
  }

  if (premiumOnly) {
    return <PremiumOnlyChainCard {...cardProps} />;
  }

  return <BaseChainsCard {...cardProps} />;
};
