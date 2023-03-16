import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { MetamaskChainsList } from '../MetamaskChainsList';
import { useMetamaskChains } from './MetamaskChainsUtils';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';

export const MetamaskChains = () => {
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
    chains,
    sortType,
    timeframe,
    searchContent,
  });

  const metamaskChains = useMetamaskChains(processedChains);

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
        <MetamaskChainsList
          timeframe={timeframe}
          chains={metamaskChains}
          chainsDictionary={chainsDictionary}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
