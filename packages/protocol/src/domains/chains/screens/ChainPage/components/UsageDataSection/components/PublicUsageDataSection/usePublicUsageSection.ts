import { Chain, Timeframe } from '@ankr.com/chains-list';

import { useProjectChainDetails } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';
import { IChainSelectorContentProps } from 'modules/common/components/ChainSelectorContent';

import { usePublicUsageData } from './usePublicUsageData';

export const usePublicUsageSection = (chain: Chain, timeframe: Timeframe) => {
  const {
    chainProtocolContext,
    chainSubType,
    chainSubTypeTab,
    chainSubTypeTabs,
    chainType,
    chainTypeTab,
    chainTypeTabs,
    group,
    groupID,
    groupTab,
    groupTabs,
    groups,
    selectGroup,
  } = useProjectChainDetails({
    projectChain: chain,
    isChainSwitcherBlockingIgnored: true,
  });

  const chainSelectorProps: IChainSelectorContentProps = {
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupID,
    groupTab,
    groupTabs,
    groups,
    hasGroupSelector: false,
    selectGroup,
    isProtocolSwitcherHidden: true,
    isGroupSelectorAutoWidth: true,
  };

  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
  } = usePublicUsageData({ chain, chainType, chainSubType, group, timeframe });

  return {
    chainProtocolContext,
    chainSelectorProps,
    countries,
    error,
    isConnecting,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
  };
};
