import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { useGetAPYQuery } from 'modules/stake-ankr/actions/getAPY';
import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { EProviderStatus, TEMPORARY_APY } from 'modules/stake-ankr/const';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { RoutesConfig } from '../../../RoutesConfig';
import { CACHE_SECONDS } from '../const';

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
  const { data: providersData, isFetching: isProvidersLoading } =
    useGetProvidersQuery(undefined, {
      refetchOnMountOrArgChange: CACHE_SECONDS,
    });

  const { data: apyData } = useGetAPYQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });

  const data: ITableRow[] = useMemo(
    () =>
      providersData?.map(
        ({ status, validator, totalDelegated, votingPower }) => {
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
        },
      ) || [],
    [apyData, providersData],
  );

  return {
    isLoading: isProvidersLoading,
    data,
  };
};
