import React, { useMemo } from 'react';
import { isTestnetPremiumOnly } from '@ankr.com/chains-list';

import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ChainProjectsSidebar } from 'domains/chains/screens/ChainPage/components/ChainProjectsSidebar';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { usePrivateChainType } from 'domains/chains/screens/ChainPage/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainType';
import { useCommonChainItem } from 'domains/chains/screens/ChainPage/hooks/useCommonChainItem';

import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import { ChainProjectsProps } from './components/ChainProjects';
import { PrivateChainCardActions } from './components/PrivateChainCardActions';
import { EChainView } from '../../../ChainViewSelector';
import {
  IUsePrivateChainCardProps,
  usePrivateChainCard,
} from './hooks/usePrivateChainCard';

interface PrivateChainCardProps
  extends IChainCardProps,
    ChainProjectsProps,
    IUsePrivateChainCardProps {}

export const PrivateChainCard = ({
  allWhitelistsBlockchains,
  chain,
  hasPremium,
  isLoadingProjects,
  jwtTokens,
  timeframe,
  view = EChainView.Cards,
}: PrivateChainCardProps) => {
  const { loading, totalRequests } = usePrivateChainsItem({ chain, timeframe });

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  const { endpoints, netId } = useCommonChainItem({
    chain,
  });

  const { chainTypeTabs } = usePrivateChainType({
    chain,
    endpoints,
    netId,
    isBlockedTestnet: !hasPremium && isTestnetPremiumOnly(chain),
    isBlockedMainnet: !hasPremium && chain?.isMainnetPremiumOnly,
  });

  const subchainLabels = getChainLabels(chain, chainTypeTabs);

  const {
    isOpened: isOpenedAddToProjectsSidebar,
    onClose: onCloseAddToProjectsSidebar,
    onOpen: onOpenAddToProjectsDialog,
  } = useDialog();

  const {
    anchorEl,
    chainProjects,
    filteredJwtTokens,
    handleClose,
    handleOpenChainMenu,
    isChainProjectsEmpty,
    isEndpointLocked,
    isMenuOpened,
  } = usePrivateChainCard({
    allWhitelistsBlockchains,
    chain,
    hasPremium,
    isLoadingProjects,
    jwtTokens,
  });

  const cardProps: IBaseChainCardProps = useMemo(
    () => ({
      isPublicLayout: false,
      view,
      chain,
      loading,
      totalRequests: totalRequestsStr,
      shouldShowDashInsteadOfRequestsString:
        totalRequests.isZero() && isChainProjectsEmpty,
      isRequestsDisabled: isChainProjectsEmpty,
      timeframe,
      actions: (
        <PrivateChainCardActions
          anchorEl={anchorEl}
          chain={chain}
          chainProjects={chainProjects}
          filteredJwtTokens={filteredJwtTokens}
          handleClose={handleClose}
          handleOpenChainMenu={handleOpenChainMenu}
          isEndpointLocked={isEndpointLocked}
          isLoadingProjects={isLoadingProjects}
          onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
          open={isMenuOpened}
          isChainProjectsEmpty={isChainProjectsEmpty}
          isCardView={view === EChainView.Cards}
        />
      ),
    }),
    [
      view,
      chain,
      loading,
      totalRequests,
      isChainProjectsEmpty,
      totalRequestsStr,
      timeframe,
      anchorEl,
      chainProjects,
      filteredJwtTokens,
      handleClose,
      handleOpenChainMenu,
      isEndpointLocked,
      isLoadingProjects,
      onOpenAddToProjectsDialog,
      isMenuOpened,
    ],
  );

  return (
    <>
      <BaseChainsCard {...cardProps} />
      <ChainProjectsSidebar
        chain={chain}
        subchainLabels={subchainLabels}
        isOpenedAddToProjectsSidebar={isOpenedAddToProjectsSidebar}
        onCloseAddToProjectsSidebar={onCloseAddToProjectsSidebar}
      />
    </>
  );
};
