import { BlockchainID, IWhitelistBlockchainsParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';

export interface IFetchProjectWhitelistBlockchainsParams
  extends IWhitelistBlockchainsParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectWhitelistBlockchains },
  useFetchProjectWhitelistBlockchainsQuery,
  useLazyFetchProjectWhitelistBlockchainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectWhitelistBlockchains: build.query<
      BlockchainID[],
      IFetchProjectWhitelistBlockchainsParams
    >({
      providesTags: (_result, _error, { token }) => [
        { type: RequestType.WhitelistBlockchains, id: token },
      ],
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

export const {
  selectDataWithFallbackCachedByParams: selectProjectWhitelistBlockchains,
  selectLoadingCachedByParams: selectProjectWhitelistBlockchainsLoading,
  selectStateCachedByParams: selectProjectWhitelistBlockchainsState,
} = createQuerySelectors({
  endpoint: fetchProjectWhitelistBlockchains,
  fallback: [],
});
