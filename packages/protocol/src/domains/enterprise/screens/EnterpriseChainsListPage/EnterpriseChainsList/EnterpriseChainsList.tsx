import { useState } from 'react';

import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectEnterpriseChains,
  selectEnterpriseStatsBySelectedApiKey,
} from 'domains/enterprise/store/selectors';
import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ChainsList } from 'modules/common/components/ChainsList';
import { ESortChainsType, Timeframe } from 'modules/chains/types';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';

import { EnterpriseChainCard } from '../EnterpriseChainCard';

export const EnterpriseChainsList = () => {
  const { chains, isLoading } = useAppSelector(selectEnterpriseChains);

  const [sortType, setSortType] = useState<ESortChainsType>(
    ESortChainsType.UsageHighLow,
  );

  const [searchContent, setSearchContent] = useSearch();

  const { data: { stats = {} } = {} } = useAppSelector(
    selectEnterpriseStatsBySelectedApiKey,
  );

  const { processedChains } = useChainsSorting({
    chains: chains.filter(excludeMultiChain),
    searchContent,
    sortType,
    timeframe: Timeframe.Day,
    privateStats: stats,
  });

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
