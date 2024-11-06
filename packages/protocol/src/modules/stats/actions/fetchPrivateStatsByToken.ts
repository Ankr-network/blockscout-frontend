import {
  GetPrivateStatsByPremiumIdParams,
  PrivateStatsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchPrivateStatsByTokenParams
  extends Omit<GetPrivateStatsByPremiumIdParams, 'premiumID'> {
  token: GetPrivateStatsByPremiumIdParams['premiumID'];
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPrivateStatsByToken },
  useFetchPrivateStatsByTokenQuery,
  useLazyFetchPrivateStatsByTokenQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPrivateStatsByToken: build.query<
      PrivateStatsResponse,
      IFetchPrivateStatsByTokenParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(async ({ group, interval, token }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getPrivateStatsByPremiumId({
          group,
          interval,
          premiumID: token,
        });

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

const fallback: PrivateStatsResponse = {
  total_requests: 0,
  stats: {},
};

export const {
  selectDataWithFallbackCachedByParams: selectPrivateStatsByToken,
  selectLoadingCachedByParams: selectPrivateStatsByTokenLoading,
  selectStateCachedByParams: selectPrivateStatsByTokenState,
} = createQuerySelectors({
  endpoint: fetchPrivateStatsByToken,
  fallback,
});
