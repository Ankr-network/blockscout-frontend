import { useMemo } from 'react';

import { Chain, Timeframe } from 'modules/chains/types';
import { IChainSelectorContentProps } from 'modules/common/components/ChainSelectorContent';
import { useProjectChainDetails } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';
import { mergeTendermintsGroups } from 'domains/dashboard/screens/Dashboard/components/PrivateChainSelectedContent/utils/mergeTendermintsGroups';

import { usePrivateUsageData } from './usePrivateUsageData';

export const usePrivateUsageSection = (chain: Chain, timeframe: Timeframe) => {
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
    shouldMergeTendermintGroups: true,
    isChainSwitcherBlockingIgnored: true,
  });

  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCost,
    totalRequests,
    totalRequestsHistory,
  } = usePrivateUsageData({
    chain,
    chainType,
    chainSubType,
    group,
    timeframe,
    chainProtocol: chainProtocolContext.chainProtocol,
    isChainProtocolSwitchEnabled:
      chainProtocolContext.isChainProtocolSwitchEnabled,
  });

  const mergedGroups = useMemo(() => mergeTendermintsGroups(groups), [groups]);

  const chainSelectorProps: IChainSelectorContentProps = {
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupID,
    groupTab,
    groupTabs,
    groups: mergedGroups,
    hasGroupSelector: false,
    selectGroup,
    isProtocolSwitcherHidden: false,
    isGroupSelectorAutoWidth: true,
  };

  return {
    chainProtocolContext,
    chainSelectorProps,
    countries,
    error,
    isConnecting,
    loading,
    totalCost,
    totalRequests,
    totalRequestsHistory,
  };
};
