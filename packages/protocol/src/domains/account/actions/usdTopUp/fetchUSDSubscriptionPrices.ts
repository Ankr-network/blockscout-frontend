import { IApiUserGroupParams, SubscriptionPrice } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchUSDSubscriptionPrices },
  useFetchUSDSubscriptionPricesQuery,
  useLazyFetchUSDSubscriptionPricesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDSubscriptionPrices: build.query<
      SubscriptionPrice[],
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();
        const { productPrices } = await api.getUSDSubscriptionPrices({ group });

        return { data: productPrices };
      }),
    }),
  }),
});
