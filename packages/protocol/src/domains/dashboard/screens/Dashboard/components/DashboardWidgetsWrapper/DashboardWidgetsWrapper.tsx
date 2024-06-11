import { OverlaySpinner } from '@ankr.com/ui';

import { ChainID, Timeframe } from 'modules/chains/types';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { DashboardWidgets as DashboardWidgetsV2 } from './v2';
import { DashboardWidgets as DashboardWidgetsV1 } from './v1';

interface IDashboardWidgetsWrapperProps {
  detailsChainId?: ChainID;
  isLoading: boolean;
  selectedChainId?: ChainID;
  selectedProjectId?: string;
  statsChainId?: ChainID;
  timeframe: Timeframe;
}

export const DashboardWidgetsWrapper = ({
  detailsChainId,
  isLoading,
  selectedChainId,
  selectedProjectId,
  statsChainId,
  timeframe,
}: IDashboardWidgetsWrapperProps) => {
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  if (isLoading || isEnterpriseStatusLoading) {
    return <OverlaySpinner />;
  }

  if (!isEnterpriseStatusLoading && isEnterpriseClient) {
    return (
      <DashboardWidgetsV2
        statsChainId={statsChainId}
        detailsChainId={detailsChainId}
        timeframe={timeframe}
        selectedProjectId={selectedProjectId}
      />
    );
  }

  return (
    <DashboardWidgetsV1
      statsChainId={statsChainId}
      detailsChainId={detailsChainId}
      timeframe={timeframe}
      selectedChainId={selectedChainId}
    />
  );
};
