import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getProviders } from 'modules/stake-mgno/actions/getProviders';
import { IProvider } from 'modules/stake-mgno/api/GnosisStakingSDK/types';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

interface ITableRow extends IProvider {
  stakeLink?: string;
  detailsLink?: string;
}

interface ITableData {
  isLoading: boolean;
  data: ITableRow[];
}

export const useTableData = (): ITableData => {
  const dispatchRequest = useDispatchRequest();
  const { data: providers, loading } = useQuery({
    type: getProviders,
  });

  useProviderEffect(() => {
    dispatchRequest(getProviders());
  }, [dispatchRequest]);

  const data: ITableRow[] =
    providers?.map(provider => {
      return {
        ...provider,
        stakeLink: RoutesConfig.stake.generatePath(provider.provider),
      };
    }) || [];

  return {
    isLoading: loading,
    data,
  };
};
