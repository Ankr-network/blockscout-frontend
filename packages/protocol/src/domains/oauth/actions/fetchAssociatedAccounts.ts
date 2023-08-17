import { AssociatedAccount } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchAssociatedAccounts },
  useLazyFetchAssociatedAccountsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAssociatedAccounts: build.query<AssociatedAccount[], void>({
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service.getOauthGateway().getAssociatedAccounts();

        return { data };
      },
    }),
  }),
});
