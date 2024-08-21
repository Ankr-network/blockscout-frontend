import { ReactNode, useMemo } from 'react';

import { Chain, ChainID } from 'modules/chains/types';
// TODO: move to some common place https://ankrnetwork.atlassian.net/browse/MRPC-3911
import { getCodeMrpc } from 'modules/common/components/GetStartedSection/components/Snippets/utils/getCode';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { useTechnology } from 'modules/common/components/GetStartedSection/components/ConnectionSnippet/hooks/useTechnology';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const getIsHiddenMainnet = (projectChain: Chain) => {
  if (
    projectChain.id === ChainID.AVALANCHE ||
    projectChain.id === ChainID.HORIZEN ||
    projectChain.id === ChainID.TENET ||
    projectChain.id === ChainID.SEI ||
    projectChain.id === ChainID.SECRET ||
    projectChain.id === ChainID.FLARE ||
    projectChain.id === ChainID.KAVA ||
    projectChain.id === ChainID.STELLAR ||
    projectChain.beacons?.length ||
    projectChain.opnodes?.length
  ) {
    return false;
  }

  return projectChain.paths?.length === 0;
};

export interface UseProjectChainDetailsParams {
  networksButton?: ReactNode;
  projectChain: Chain;
  isCompactView?: boolean;
  shouldMergeTendermintGroups?: boolean;
  isChainSwitcherBlockingIgnored?: boolean;
}

export const useProjectChainDetails = ({
  isChainSwitcherBlockingIgnored,
  isCompactView,
  networksButton,
  projectChain,
  shouldMergeTendermintGroups,
}: UseProjectChainDetailsParams) => {
  const { hasPremium } = useAuth();

  const {
    chain: privateChain,
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
    headerContent,
    selectGroup,
  } = usePrivateChainItem({
    additionalSelector: networksButton,
    chain: projectChain,
    isGroupSelectorAutoWidth: true,
    unfilteredChain: projectChain,
    isHiddenMainnet: getIsHiddenMainnet(projectChain),
    isCompactView,
    shouldMergeTendermintGroups,
    isChainSwitcherBlockingIgnored,
  });

  const [technology, setTechnology] = useTechnology();

  const [httpCode, wssCode] = useMemo(
    () => getCodeMrpc(technology, group.urls),
    [group, technology],
  );

  return {
    chainProtocolContext,
    headerContent,
    httpCode,
    privateChain,
    setTechnology,
    technology,
    wssCode: hasPremium ? wssCode : undefined,
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupID,
    groupTab,
    groupTabs,
    groups,
    selectGroup,
    chainSubType,
    chainType,
    group,
  };
};
