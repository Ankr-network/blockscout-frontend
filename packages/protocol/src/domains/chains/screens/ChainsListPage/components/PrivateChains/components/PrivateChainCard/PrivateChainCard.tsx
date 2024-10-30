import { isTestnetPremiumOnly } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { ChainProjectsSidebar } from 'domains/chains/screens/ChainPage/components/ChainProjectsSidebar';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCommonChainItem } from 'domains/chains/screens/ChainPage/hooks/useCommonChainItem';
import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePrivateChainType } from 'domains/chains/screens/ChainPage/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainType';

import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import { PrivateChainCardActions } from './components/PrivateChainCardActions';
import { EChainView } from '../../../ChainViewSelector';
import {
  IUsePrivateChainCardProps,
  usePrivateChainCard,
} from './hooks/usePrivateChainCard';

interface PrivateChainCardProps
  extends IChainCardProps,
    IUsePrivateChainCardProps {}

export const PrivateChainCard = ({
  chain,
  timeframe,
  view = EChainView.Cards,
}: PrivateChainCardProps) => {
  const { hasPremium } = useAuth();
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

  const subchainLabels = useMemo(
    () => getChainLabels(chain, chainTypeTabs),
    [chain, chainTypeTabs],
  );

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
    projectsLoading,
  } = usePrivateChainCard({ chain });

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
          isCardView={view === EChainView.Cards}
          isChainProjectsEmpty={isChainProjectsEmpty}
          isEndpointLocked={isEndpointLocked}
          onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
          open={isMenuOpened}
          projectsLoading={projectsLoading}
        />
      ),
    }),
    [
      anchorEl,
      chain,
      chainProjects,
      filteredJwtTokens,
      handleClose,
      handleOpenChainMenu,
      isChainProjectsEmpty,
      isEndpointLocked,
      isMenuOpened,
      loading,
      onOpenAddToProjectsDialog,
      projectsLoading,
      timeframe,
      totalRequests,
      totalRequestsStr,
      view,
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
