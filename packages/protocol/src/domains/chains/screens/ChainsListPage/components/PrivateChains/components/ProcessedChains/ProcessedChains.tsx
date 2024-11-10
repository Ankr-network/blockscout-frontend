import { Chain, Timeframe } from '@ankr.com/chains-list';
import { PrivateStats } from 'multirpc-sdk';
import { memo } from 'react';

import { IProjectWithBlockchains } from 'domains/projects/types';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import { EChainView } from '../../../ChainViewSelector';
import { PrivateChainCard } from '../PrivateChainCard';

export interface IProcessedChainsProps {
  allProjectsStats: PrivateStats;
  hasPremium: boolean;
  jwts: JWT[];
  onPromoDialogOpen: () => void;
  processedChains: Chain[];
  projectsLoading: boolean;
  projectsWithBlockchains: IProjectWithBlockchains[];
  timeframe: Timeframe;
  view?: EChainView;
}

export const ProcessedChains = memo(
  ({
    allProjectsStats,
    hasPremium,
    jwts,
    onPromoDialogOpen,
    processedChains,
    projectsLoading,
    projectsWithBlockchains,
    timeframe,
    view,
  }: IProcessedChainsProps) => {
    return (
      <>
        {processedChains.map(chain => (
          <PrivateChainCard
            allProjectsStats={allProjectsStats}
            chain={chain}
            hasPremium={hasPremium}
            jwts={jwts}
            key={chain.id}
            onOpenUpgradeModal={onPromoDialogOpen}
            projectsLoading={projectsLoading}
            projectsWithBlockchains={projectsWithBlockchains}
            timeframe={timeframe}
            view={view}
          />
        ))}
      </>
    );
  },
);

ProcessedChains.displayName = 'ProcessedChains';
