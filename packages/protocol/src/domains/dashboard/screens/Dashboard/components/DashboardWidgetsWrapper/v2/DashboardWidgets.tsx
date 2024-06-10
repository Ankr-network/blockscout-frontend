import { OverlaySpinner } from '@ankr.com/ui';

import { ChainID, Timeframe } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectIsUsageLoading } from 'domains/dashboard/store/selectors/v2';

import { ChainLayout } from '../../ChainLayout/v2';
import { AllChainsLayout } from '../../AllChainsLayout/v2';
import { useDashboardData } from './hooks/useDashboardData';

interface IDashboardWidgetsProps {
  timeframe: Timeframe;
  statsChainId?: ChainID;
  detailsChainId?: ChainID;
  selectedProjectId?: string;
}

export const DashboardWidgets = ({
  timeframe,
  statsChainId,
  detailsChainId,
  selectedProjectId,
}: IDashboardWidgetsProps) => {
  const isChainSelected = statsChainId && detailsChainId;

  useDashboardData({
    timeframe,
    statsChainId,
    selectedProjectId,
  });

  const { isLoading } = useAppSelector(selectIsUsageLoading);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (isChainSelected) {
    return (
      <ChainLayout
        statsChainId={statsChainId}
        detailsChainId={detailsChainId}
        timeframe={timeframe}
        selectedProjectId={selectedProjectId}
      />
    );
  }

  return <AllChainsLayout timeframe={timeframe} />;
};
