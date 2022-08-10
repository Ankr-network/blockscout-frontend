import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { EProviderStatus, TEMPORARY_APY } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface ITableRow {
  provider: string;
  nodeAmount: number;
  apy: string;
  stakedPool: string;
  stakedPoolPercent: number;
  rps: BigNumber;
  online: number;
  status: EProviderStatus;
  stakeLink?: string;
  detailsLink?: string;
  exitDays?: number;
  bondingDays?: number;
}

interface ITableData {
  isLoading: boolean;
  data: ITableRow[];
}

export const useTableData = (): ITableData => {
  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const { data: apyData } = useQuery({
    type: getAPY,
  });

  const data: ITableRow[] =
    providers?.map(({ status, validator, totalDelegated, votingPower }) => {
      const apyItem = apyData?.find(x => x.validator === validator);

      const apy = apyItem
        ? apyItem.apy.decimalPlaces(DEFAULT_ROUNDING).toFormat()
        : TEMPORARY_APY.toFormat();

      return {
        provider: getDemoProviderName(validator) ?? validator,
        nodeAmount: 0,
        apy,
        stakedPool: getShortNumber(totalDelegated),
        stakedPoolPercent: votingPower,
        rps: ZERO,
        online: 0,
        status: +status,
        stakeLink: RoutesConfig.stake.generatePath(validator),
        detailsLink: '',
      };
    }) || [];
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  return {
    isLoading: isProvidersLoading,
    data,
  };
};
