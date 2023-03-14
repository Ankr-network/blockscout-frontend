import { usePublicChainsItem } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicChainsItem/hooks/usePublicChainsItem';
import { useCommonChainsItemData } from 'domains/chains/screens/Chains/hooks/useCommonChainsItemData';
import { Chain, Timeframe } from 'domains/chains/types';
import { BaseChainsCard } from '../BaseChainsCard';

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
  const { totalRequests, loading } = usePublicChainsItem({ chain, timeframe });

  const { totalRequestsStr } = useCommonChainsItemData(chain, totalRequests);

  return (
    <BaseChainsCard
      chain={chain}
      timeframe={timeframe}
      totalRequests={totalRequestsStr}
      loading={Boolean(loading)}
      {...props}
    />
  );
};
