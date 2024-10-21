import { BlockchainID, IWhitelistBlockchainsParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { fetchWhitelistBlockchains },
  useLazyFetchWhitelistBlockchainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelistBlockchains: build.query<
      BlockchainID[],
      IWhitelistBlockchainsParams
    >({
      providesTags: [RequestType.WhitelistBlockchains],
      queryFn: createNotifyingQueryFn(async (params, { getState }) => {
        const api = MultiService.getService().getAccountingGateway();
        const allBlockchainsPaths = selectAllChainsPaths(
          getState() as RootState,
        );

        const data = await api.getWhitelistBlockchains(params);

        // empty array of blockchains means all chains are added to project
        if (data.length === 0) {
          return { data: allBlockchainsPaths };
        }

        return { data };
      }),
    }),
  }),
});
