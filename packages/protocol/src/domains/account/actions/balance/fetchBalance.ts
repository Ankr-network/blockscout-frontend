import { IApiUserGroupParams, IBalance } from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchBalance },
  useFetchBalanceQuery,
  useLazyFetchBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBalance: build.query<IBalance, IApiUserGroupParams>({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        await authorizationGuard(getState as GetState);

        const api = MultiService.getService().getAccountGateway();

        const data = await api.getAnkrBalance({ group });

        return { data };
      }),
    }),
  }),
});
