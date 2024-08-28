import { IGetRewardTxsParams, IRewardTx } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchRewardTxsParams extends IGetRewardTxsParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchRewardTxs },
  useFetchRewardTxsQuery,
  useLazyFetchRewardTxsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRewardTxs: build.query<IRewardTx[], IFetchRewardTxsParams>({
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getRewardTxs(params);

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectRewardTxs,
  selectLoadingCachedByParams: selectRewardTxsLoading,
  selectStateCachedByParams: selectRewardTxsState,
} = createQuerySelectors({ endpoint: fetchRewardTxs, fallback: [] });
