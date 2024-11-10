import { PrivateStats } from 'multirpc-sdk';
import { isTestnetPremiumOnly } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { ChainProjectsSidebar } from 'domains/chains/screens/ChainPage/components/ChainProjectsSidebar';
import { getChainLabels } from 'modules/chains/utils/getChainLabels';
import { useCommonChainItem } from 'domains/chains/screens/ChainPage/hooks/useCommonChainItem';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePrivateChainType } from 'domains/chains/screens/ChainPage/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainType';

import { BaseChainsCard } from '../../../BaseChainsCard';
import { EChainView } from '../../../ChainViewSelector';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import {
  IUsePrivateChainCardProps,
  usePrivateChainCard,
} from './hooks/usePrivateChainCard';
import { PrivateChainCardActions } from './components/PrivateChainCardActions';
import { aggregateTotalRequestsNumber } from '../../utils/aggregateTotalRequestsNumber';
import { getChainIDs } from '../../utils/getChainIDs';

export interface PrivateChainCardProps
  extends IChainCardProps,
    IUsePrivateChainCardProps {
  allProjectsStats: PrivateStats;
  projectsLoading: boolean;
}

export const PrivateChainCard = ({
  allProjectsStats,
  chain,
  hasPremium,
  jwts,
  projectsLoading,
  projectsWithBlockchains,
  timeframe,
  view = EChainView.Cards,
}: PrivateChainCardProps) => {
  const ids = useMemo(() => getChainIDs(chain), [chain]);
  const totalRequests = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats: allProjectsStats }),
    [allProjectsStats, ids],
  );

  const totalRequestsStr = totalRequests.toString();

  const { endpoints, netId } = useCommonChainItem({ chain });

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
    hasChainProjects,
    isEndpointLocked,
    isMenuOpened,
  } = usePrivateChainCard({ chain, hasPremium, jwts, projectsWithBlockchains });

  const isChainProjectsEmpty = !hasChainProjects && !projectsLoading;

  return (
    <>
      <BaseChainsCard
        view={view}
        chain={chain}
        totalRequests={totalRequestsStr}
        shouldShowDashInsteadOfRequestsString={
          totalRequests === 0 && isChainProjectsEmpty
        }
        isRequestsDisabled={isChainProjectsEmpty}
        timeframe={timeframe}
        actions={
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
        }
      />
      <ChainProjectsSidebar
        chain={chain}
        isOpenedAddToProjectsSidebar={isOpenedAddToProjectsSidebar}
        jwts={jwts}
        onCloseAddToProjectsSidebar={onCloseAddToProjectsSidebar}
        projectsWithBlockchains={projectsWithBlockchains}
        subchainLabels={subchainLabels}
      />
    </>
  );
};
