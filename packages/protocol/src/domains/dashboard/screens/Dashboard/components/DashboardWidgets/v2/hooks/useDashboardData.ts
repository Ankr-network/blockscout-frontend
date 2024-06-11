import { useEffect, useMemo } from 'react';
import { ETelemetryTopOf } from 'multirpc-sdk';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useLazyChainsFetchEnterpriseV2StatsTotalQuery } from 'domains/enterprise/actions/v2/fetchEnterpriseStatsTotal';
import { emptyFn } from 'modules/common/utils/emptyFn';
import { ChainID, Timeframe } from 'modules/chains/types';

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
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetchUsage] = useLazyChainsFetchEnterpriseV2StatsTotalQuery();

  const timeParams = useMemo(
    () => mapTimeframeToRequestParams(timeframe),
    [timeframe],
  );

  useEffect(() => {
    const shouldRequest =
      !isEnterpriseStatusLoading && isEnterpriseClient && group;

    const apiKeyIds = selectedProjectId ? [selectedProjectId] : undefined;
    const blockchains = statsChainId ? [statsChainId] : undefined;

    if (shouldRequest) {
      const { abort } = fetchUsage({
        ...timeParams,
        group,
        apiKeyIds,
        blockchains,
        topLimit: 15,
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
      });

      return abort;
    }

    return emptyFn;
  }, [
    isEnterpriseClient,
    group,
    fetchUsage,
    isEnterpriseStatusLoading,
    timeframe,
    timeParams,
    selectedProjectId,
    statsChainId,
  ]);
};
