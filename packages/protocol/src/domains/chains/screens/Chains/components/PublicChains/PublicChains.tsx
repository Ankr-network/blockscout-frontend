import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ChainsList } from '../ChainsList';
import { ChainsSortSelect } from '../ChainsSortSelect';
import { ReactSnapChainsLinksGenerator } from '../ReactSnapChainsLinksGenerator';
import { usePublicChainsData } from './PublicChainsUtils';
import { BaseChains } from '../BaseChains';

export interface PublicChainsProps {
  isMMIndex?: boolean;
}

export const PublicChains = ({ isMMIndex }: PublicChainsProps) => {
  const { chains, allChains, loading, setSortType, sortType, timeframe } =
    usePublicChainsData();

  return (
    <BaseChains
      loading={loading}
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
    >
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <ChainsList
          isMMIndex={isMMIndex}
          chains={chains}
          allChains={allChains}
          sortType={sortType}
          timeframe={timeframe}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
