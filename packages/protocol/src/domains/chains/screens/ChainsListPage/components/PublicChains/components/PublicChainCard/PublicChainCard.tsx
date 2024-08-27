import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { Timeframe, Chain } from 'modules/chains/types';

import { usePublicChainsItem } from './hooks/usePublicChainsItem';
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
  const { loading = false, totalRequests } = usePublicChainsItem({
    chain,
    timeframe,
  });

  const { totalRequestsStr } = useCommonChainsItemData(chain, totalRequests);
  const { isComingSoon, premiumOnly } = chain;

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
