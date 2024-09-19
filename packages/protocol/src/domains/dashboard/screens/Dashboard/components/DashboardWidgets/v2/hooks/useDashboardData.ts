import { useEffect, useMemo, useRef } from 'react';
import { ETelemetryTopOf } from 'multirpc-sdk';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useLazyChainsFetchEnterpriseV2StatsTotalQuery } from 'domains/enterprise/actions/v2/fetchEnterpriseStatsTotal';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseEndpointsLoading } from 'domains/enterprise/store/selectors';

import { mapTimeframeToRequestParams } from '../../../AllChainsLayout/v2/utils';

interface IUseDashboardDataProps {
  timeframe: Timeframe;
  statsChainId?: ChainID;
  selectedProjectId?: string;
}

export const useDashboardData = ({
  selectedProjectId,
  statsChainId,
  timeframe,
}: IUseDashboardDataProps) => {
  const selectedProjectRef = useRef(selectedProjectId);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetchUsage] = useLazyChainsFetchEnterpriseV2StatsTotalQuery();

  const timeParams = useMemo(
    () => mapTimeframeToRequestParams(timeframe),
    [timeframe],
  );

  const isLoadingEndpoints = useAppSelector(selectEnterpriseEndpointsLoading);

  useEffect(() => {
    const isProjectChanged = selectedProjectRef.current !== selectedProjectId;

    const shouldRequest =
      !isEnterpriseStatusLoading &&
      isEnterpriseClient &&
      group &&
      !isLoadingEndpoints;

    const apiKeyIds = selectedProjectId ? [selectedProjectId] : undefined;
    const blockchains =
      statsChainId && !isProjectChanged ? [statsChainId] : undefined;

    if (shouldRequest) {
      fetchUsage({
        ...timeParams,
        group,
        apiKeyIds,
        blockchains,
        topLimit: 0,
        includeTopOfs: [
          ETelemetryTopOf.IP,
          ETelemetryTopOf.ERROR,
          ETelemetryTopOf.COUNTRY,
          ETelemetryTopOf.METHOD,
          ETelemetryTopOf.BLOCKCHAIN,
          ETelemetryTopOf.PROTOCOL,
          ETelemetryTopOf.TENANT,
          ETelemetryTopOf.API_KEY,
          ETelemetryTopOf.MONTHLY_USAGE,
        ],
        shouldSetBlockchains: isProjectChanged,
      });

      selectedProjectRef.current = selectedProjectId;
    }
  }, [
    isEnterpriseClient,
    group,
    fetchUsage,
    isEnterpriseStatusLoading,
    timeframe,
    timeParams,
    selectedProjectId,
    statsChainId,
    isLoadingEndpoints,
  ]);
};
