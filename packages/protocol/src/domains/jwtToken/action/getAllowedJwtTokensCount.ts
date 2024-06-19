import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchAllowedJwtTokensCount },
  useLazyFetchAllowedJwtTokensCountQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowedJwtTokensCount: build.query<number, IApiUserGroupParams>({
      queryFn: async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getAllowedJwtTokensCount({ group });

        return { data };
      },
    }),
  }),
});
