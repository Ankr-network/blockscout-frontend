import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectChainsWithStats,
  selectChainsWithStatsBySelectedProject,
} from 'domains/dashboard/store/selectors/v1';

import { usePrivateStatsParams } from '../../hooks/usePrivateStatsParams';

export interface IUseChainIdsProps {
  timeframe: Timeframe;
}

export const useChainIds = ({ timeframe }: IUseChainIdsProps) => {
  const { group, interval, selectedProject } = usePrivateStatsParams({
    timeframe,
  });

  const chainIds = useAppSelector(state =>
    selectChainsWithStats(state, { group, interval }),
  );

  const chinIdsBySelectedProject = useAppSelector(state =>
    selectChainsWithStatsBySelectedProject(state, { group, interval }),
  );

  return (selectedProject ? chinIdsBySelectedProject : chainIds) as ChainID[];
};
