import { usePublicChainsItem } from './hooks/usePublicChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { Chain, Timeframe } from 'domains/chains/types';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { PremiumOnlyChainCard } from '../../../PremiumOnlyChainCard';

export interface IChainCardProps {
  chain: Chain;
  timeframe: Timeframe;
  switchTimeframe: () => void;
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
  const { premiumOnly } = chain;

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    timeframe,
    totalRequests: totalRequestsStr,
    ...props,
  };

  if (premiumOnly) {
    return <PremiumOnlyChainCard {...cardProps} />;
  }

  return <BaseChainsCard {...cardProps} />;
};
