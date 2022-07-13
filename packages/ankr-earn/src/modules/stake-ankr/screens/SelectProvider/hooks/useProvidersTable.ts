import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
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
}: IValidator): IProvidersTableRow {
  return {
    providerName: 'Mind Heart Sou0l',
    apy: '24.5%',
    stakedPool: '486K (24%)',
    uptime: '99.9%',
    rps: '12,546',
    providerLink: RoutesConfig.stake.generatePath(validator),
    status: +status,
  };
}
