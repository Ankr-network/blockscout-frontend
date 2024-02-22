import { AssociatedAccount } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { fetchAssociatedAccounts },
  useFetchAssociatedAccountsQuery,
  useLazyFetchAssociatedAccountsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAssociatedAccounts: build.query<AssociatedAccount[], void>({
      providesTags: [RequestType.BindingAccounts],
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getAssociatedAccounts();

        return { data };
      },
    }),
  }),
});
