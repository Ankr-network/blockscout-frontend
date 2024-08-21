import { useCallback, useMemo, useState } from 'react';

import { SortType, Timeframe } from 'modules/chains/types';
import { ESortChainsType } from 'domains/projects/types';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import {
  formatRequestsCount,
  sortPublicChains,
} from 'domains/chains/screens/Chains/components/PublicChains/hooks/utils';

import { useProjectChainsContext } from '../../../hooks/useProjectChainsContext';
import { useChainStats } from './useChainStats';

export interface IProjectChainsAccordionProps {
  searchValue?: string;
  sortType?: ESortChainsType;
  timeframe: Timeframe;
  userEndpointToken?: string;
}

const MAX_VISIBLE_CHAINS = 10;

export const useProjectChainsAccordion = ({
  searchValue = '',
  sortType,
  timeframe,
  userEndpointToken,
}: IProjectChainsAccordionProps) => {
  const {
    isLoading,
    projectChains,
    projectChainsTabs,
    selectedProjectChainsTab,
  } = useProjectChainsContext();

  const filteredChains = useMemo(() => {
    return projectChains?.filter(chain =>
      getFilteredChainsByName(chain, searchValue),
    );
  }, [projectChains, searchValue]);

  const { data, isLoading: arePublicStatsLoading } =
    useChainsFetchPublicRequestsCountStatsQuery(
      toTimeframeMap[Timeframe.Month],
    );

  const sortedChainsByPublicUsage = useMemo(() => {
    return sortPublicChains({
      chains: formatRequestsCount(filteredChains, data),
      sortType: SortType.Usage,
      isLoading: arePublicStatsLoading,
    });
  }, [arePublicStatsLoading, data, filteredChains]);

  const { requestsData } = useChainStats(timeframe, userEndpointToken);

  const sortedChains = useMemo(() => {
    if (sortType === ESortChainsType.NameAZ) {
      return [...sortedChainsByPublicUsage].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    if (sortType === ESortChainsType.NameZA) {
      return [...sortedChainsByPublicUsage].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }

    if (sortType === ESortChainsType.UsageHighLow) {
      if (requestsData) {
        return [...filteredChains].sort(
          (a, b) => (requestsData[b.id] ?? 0) - (requestsData[a.id] ?? 0),
        );
      }
    }

    if (sortType === ESortChainsType.UsageLowHigh) {
      if (requestsData) {
        return [...filteredChains].sort(
          (a, b) => (requestsData[a.id] ?? 0) - (requestsData[b.id] ?? 0),
        );
      }
    }

    return sortedChainsByPublicUsage;
  }, [sortedChainsByPublicUsage, filteredChains, sortType, requestsData]);

  const hasExpandButton = sortedChains.length > MAX_VISIBLE_CHAINS;

  const [isChainsListExpanded, setIsChainsListExpanded] = useState(
    !hasExpandButton,
  );

  const visibleChains = useMemo(() => {
    return isChainsListExpanded
      ? sortedChains
      : sortedChains.slice(0, MAX_VISIBLE_CHAINS);
  }, [isChainsListExpanded, sortedChains]);

  const handleExpandButtonClick = useCallback(() => {
    setIsChainsListExpanded(!isChainsListExpanded);
  }, [isChainsListExpanded]);

  return {
    isChainsListExpanded,
    setIsChainsListExpanded,
    sortedChains,
    searchValue,
    sortType,
    selectedProjectChainsTab,
    projectChainsTabs,
    hasExpandButton,
    visibleChains,
    handleExpandButtonClick,
    isLoading,
  };
};
