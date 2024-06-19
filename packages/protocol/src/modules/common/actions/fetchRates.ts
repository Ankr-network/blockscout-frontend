import { BigNumber } from 'bignumber.js';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getAnkrUsdt } from 'modules/api/sdk';
import { web3Api } from 'store/queries';

interface IRates {
  ankrUsdt: BigNumber;
}

export const {
  endpoints: { commonRates },
  useCommonRatesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    commonRates: build.query<IRates, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const ankrUsdt = await getAnkrUsdt();

        return {
          data: {
            ankrUsdt,
          },
        };
      }),
    }),
  }),
});
