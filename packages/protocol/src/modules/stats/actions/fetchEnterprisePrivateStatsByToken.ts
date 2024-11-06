import {
  GetPrivateStatsByPremiumIdParams,
  PrivateStatsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { REFETCH_STATS_INTERVAL } from '../const';

export interface IFetchEnterprisePrivateStatsByTokenParams
  extends Omit<GetPrivateStatsByPremiumIdParams, 'premiumID'> {
  token: GetPrivateStatsByPremiumIdParams['premiumID'];
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchEnterprisePrivateStatsByToken },
  useFetchEnterprisePrivateStatsByTokenQuery,
  useLazyFetchEnterprisePrivateStatsByTokenQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchEnterprisePrivateStatsByToken: build.query<
      PrivateStatsResponse,
      IFetchEnterprisePrivateStatsByTokenParams
    >({
      keepUnusedDataFor: REFETCH_STATS_INTERVAL,
      queryFn: createNotifyingQueryFn(
        async ({ group, interval, token: premiumID }) => {
          const api = MultiService.getService().getEnterpriseGateway();

          const data = await api.getPrivateStatsByPremiumId({
            group,
            interval,
            premiumID,
          });

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

const fallback: PrivateStatsResponse = {
  total_requests: 0,
  stats: {},
};

export const {
  selectDataWithFallbackCachedByParams: selectEnterprisePrivateStatsByToken,
  selectLoadingCachedByParams: selectEnterprisePrivateStatsByTokenLoading,
  selectStateCachedByParams: selectEnterprisePrivateStatsByTokenState,
} = createQuerySelectors({
  endpoint: fetchEnterprisePrivateStatsByToken,
  fallback,
});
