import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { IValidator } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

import { IProvidersTableRow } from '../components/ProvidersTable';

interface IUseProvidersTable {
  data: IProvidersTableRow[];
  isLoading: boolean;
}

export const useProvidersTable = (): IUseProvidersTable => {
  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const data = providers?.map(mapProviderDemo) || [];
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  return {
    data,
    isLoading: isProvidersLoading,
  };
};

// todo: refactor when actual data will be available
function mapProviderDemo({
  // eslint-disable-next-line no-unused-vars
  validator,
  status,
  totalDelegated,
  votingPower,
}: IValidator): IProvidersTableRow {
  return {
    providerName: 'ANKR',
    apy: '0%',
    stakedPool: totalDelegated.toFormat(),
    stakedPoolPercent: votingPower,
    providerLink: RoutesConfig.stake.generatePath(validator),
    status: +status,
  };
}
