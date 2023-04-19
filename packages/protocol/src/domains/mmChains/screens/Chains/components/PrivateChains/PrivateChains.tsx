import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { ChainsList } from '../ChainsList';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { proccessTestnetOnlyChains } from '../../utils/processTestnetOnlyChains';
import { useNetworksConfigurations } from '../../utils/useNetworksConfigurations';
import { usePrivateChains } from '../../../../../chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from '../../../../../chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsData';

interface IPrivateChainsProps {
  hasPremium: boolean;
}

export const PrivateChains = ({ hasPremium }: IPrivateChainsProps) => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
    searchContent,
    setSearchContent,
  } = usePrivateChainsData();

  const { processedChains, chainsDictionary } = usePrivateChains({
    allChains,
    chains: proccessTestnetOnlyChains(chains),
    sortType,
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
          hasPremium={hasPremium}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
