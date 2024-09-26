import { IGetRewardBalanceParams, IGetRewardBalanceResult } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

export interface IFetchRewardBalanceParams extends IGetRewardBalanceParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchRewardBalance },
  useFetchRewardBalanceQuery,
  useLazyFetchRewardBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRewardBalance: build.query<
      IGetRewardBalanceResult,
      IFetchRewardBalanceParams
    >({
      providesTags: [RequestType.RewardBalance],
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getRewardBalance(params);

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataCachedByParams: selectRewardBalance,
  selectLoadingCachedByParams: selectRewardBalanceLoading,
  selectStateCachedByParams: selectRewardBalanceState,
} = createQuerySelectors({ endpoint: fetchRewardBalance });
