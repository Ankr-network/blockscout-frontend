import { OverlaySpinner } from '@ankr.com/ui';

import { ChainID, Timeframe } from 'modules/chains/types';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { DashboardWidgets as DashboardWidgetsV2 } from './v2';
import { DashboardWidgets as DashboardWidgetsV1 } from './v1';

interface IDashboardWidgetsWrapperProps {
  isLoading: boolean;
  timeframe: Timeframe;
  selectedChainId?: ChainID;
  statsChainId?: ChainID;
  detailsChainId?: ChainID;
  selectedProjectId?: string;
}

export const DashboardWidgetsWrapper = ({
  isLoading,
  timeframe,
  statsChainId,
  selectedChainId,
  detailsChainId,
  selectedProjectId,
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
