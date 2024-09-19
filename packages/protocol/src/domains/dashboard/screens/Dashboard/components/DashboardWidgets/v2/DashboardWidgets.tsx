import { OverlaySpinner } from '@ankr.com/ui';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import { selectIsUsageLoading } from 'domains/dashboard/store/selectors/v2';
import { selectEnterpriseEndpointsLoading } from 'domains/enterprise/store/selectors';

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
  detailsChainId,
  selectedProjectId,
  statsChainId,
  timeframe,
}: IDashboardWidgetsProps) => {
  const isChainSelected = statsChainId && detailsChainId;

  useDashboardData({
    timeframe,
    statsChainId,
    selectedProjectId,
  });

  const { isLoading } = useAppSelector(selectIsUsageLoading);
  const isLoadingEndpoints = useAppSelector(selectEnterpriseEndpointsLoading);

  if (isLoading || isLoadingEndpoints) {
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
