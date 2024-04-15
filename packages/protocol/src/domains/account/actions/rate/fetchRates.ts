import { CurrencyRate } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchRates },
  useFetchRatesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRates: build.query<CurrencyRate[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const api = MultiService.getService().getPublicGateway();

        const { rates: data } = await api.getRate();

        return { data };
      }),
    }),
  }),
});
