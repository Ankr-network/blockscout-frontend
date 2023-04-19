import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { ChainsList } from '../ChainsList';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { proccessTestnetOnlyChains } from '../../utils/processTestnetOnlyChains';
import { useNetworksConfigurations } from '../../utils/useNetworksConfigurations';

export const PublicChains = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
    searchContent,
    setSearchContent,
  } = usePublicChainsData();

  const { processedChains, chainsDictionary } = usePublicChains({
    allChains,
    chains: proccessTestnetOnlyChains(chains),
    sortType,
    timeframe,
    searchContent,
  });

  const networksConfigurations = useNetworksConfigurations(processedChains);

  return (
    <BaseChains
      loading={loading}
      baseChainsHeader={
        <BaseChainsHeader
          sortType={sortType}
          setSortType={setSortType}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
      }
    >
      <NoReactSnap>
        <ChainsList
          timeframe={timeframe}
          chains={networksConfigurations}
          chainsDictionary={chainsDictionary}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
