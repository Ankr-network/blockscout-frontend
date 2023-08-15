import { IApiUserGroupParams, IBalance } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchBalance },
  useLazyFetchBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBalance: build.query<IBalance, IApiUserGroupParams>({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountGateway();

        const data = await api.getAnkrBalance({ group });

        return { data };
      }),
    }),
  }),
});
