import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { IValidator } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { EProviderStatus } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface ITableRow {
  provider: string;
  nodeAmount: number;
  apy: number;
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
  const { data: apy } = useQuery({
    type: getAPY,
  });

  const data = providers?.map(mapProviderDemo) || [];
  const dispatchRequest = useDispatchRequest();

  if (data.length === 1) {
    data[0].apy = apy?.toNumber() ?? 0;
  }

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  return {
    isLoading: isProvidersLoading,
    data,
  };
};

function mapProviderDemo({
  status,
  validator,
  totalDelegated,
  votingPower,
}: IValidator): ITableRow {
  return {
    provider: 'ANKR',
    nodeAmount: 0,
    apy: 0,
    stakedPool: totalDelegated.toFormat(),
    stakedPoolPercent: votingPower,
    rps: ZERO,
    online: 0,
    status: +status,
    stakeLink: RoutesConfig.stake.generatePath(validator),
    detailsLink: '',
  };
}
