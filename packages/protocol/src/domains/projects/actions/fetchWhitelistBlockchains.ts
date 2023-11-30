import { BlockchainID, IWhitelistBlockchainsParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchWhitelistBlockchains },
  useLazyFetchWhitelistBlockchainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelistBlockchains: build.query<
      BlockchainID[],
      IWhitelistBlockchainsParams
    >({
      providesTags: ['WhitelistBlockchains'],
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getWhitelistBlockchains(params);

        return { data };
      }),
    }),
  }),
});
