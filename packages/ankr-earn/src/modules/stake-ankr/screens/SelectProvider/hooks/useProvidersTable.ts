import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { IValidator } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

import { RoutesConfig } from '../../../RoutesConfig';
import { IProvidersTableRow } from '../components/ProvidersTable';

interface IUseProvidersTable {
  data: IProvidersTableRow[];
  isLoading: boolean;
}

export const useProvidersTable = (): IUseProvidersTable => {
  const { data: providers, isFetching: isProvidersLoading } =
    useGetProvidersQuery();
  const data = providers?.map(mapProviderDemo) || [];

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
