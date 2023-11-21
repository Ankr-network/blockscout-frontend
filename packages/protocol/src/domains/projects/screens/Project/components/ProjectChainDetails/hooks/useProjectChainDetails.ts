import { ReactNode, useMemo } from 'react';

import { Chain, ChainID } from 'modules/chains/types';
// TODO: move to some common place https://ankrnetwork.atlassian.net/browse/MRPC-3911
import { getCodeMrpc } from 'modules/common/components/GetStartedSection/components/Snippets/utils/getCode';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { useTechnology } from 'modules/common/components/GetStartedSection/components/ConnectionSnippet/hooks/useTechnology';

const getIsHiddenMainnet = (projectChain: Chain) => {
  if (
    projectChain.id === ChainID.AVALANCHE ||
    projectChain.id === ChainID.HORIZEN ||
    projectChain.id === ChainID.TENET ||
    projectChain.beacons?.length ||
    projectChain.opnodes?.length
  ) {
    return false;
  }

  return projectChain.paths?.length === 0;
};

export interface UseProjectChainDetailsParams {
  networksButton: ReactNode;
  projectChain: Chain;
}

export const useProjectChainDetails = ({
  networksButton,
  projectChain,
}: UseProjectChainDetailsParams) => {
  const {
    chainProtocolContext,
    chain: privateChain,
    headerContent,
    group,
  } = usePrivateChainItem({
    additionalSelector: networksButton,
    chain: projectChain,
    isChainArchived: Boolean(projectChain.isArchive),
    isGroupSelectorAutoWidth: true,
    unfilteredChain: projectChain,
    isHiddenMainnet: getIsHiddenMainnet(projectChain),
    isPremiumLabelHidden: true,
    isChainRequestStatsVisible: true,
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
    wssCode,
  };
};
