import { useMemo } from 'react';

import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectEnterpriseChains,
  selectEnterpriseStatsBySelectedApiKey,
} from 'domains/enterprise/store/selectors';
import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ChainsList } from 'modules/common/components/ChainsList';
import { Timeframe } from 'modules/chains/types';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { sortPrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/utils';
import { useSortType } from 'domains/chains/screens/Chains/hooks/useSortType';

import { EnterpriseChainCard } from '../EnterpriseChainCard';

export const EnterpriseChainsList = () => {
  const { chains, isLoading } = useAppSelector(selectEnterpriseChains);

  const [sortType, setSortType] = useSortType();

  const [searchContent, setSearchContent] = useSearch();

  const { data: { stats = {} } = {} } = useAppSelector(
    selectEnterpriseStatsBySelectedApiKey,
  );

  const processedChains = useMemo(
    () =>
      sortPrivateChains({
        chains,
        sortType,
        stats,
      })
        .filter(item => getFilteredChainsByName(item, searchContent))
        .filter(excludeMultiChain),
    [stats, chains, sortType, searchContent],
  );

  return (
    <BaseChains loading={isLoading}>
      <>
        <BaseChainsHeader
          sortType={sortType}
          setSortType={setSortType}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
        <ChainsList chains={processedChains}>
          {processedChains.map(item => {
            const { id } = item;

            return (
              <EnterpriseChainCard
                key={id}
                chain={item}
                timeframe={Timeframe.Month}
                hasTotalRequestsLabel
                hasPremium
              />
            );
          })}
        </ChainsList>
      </>
    </BaseChains>
  );
};
