import {
  IGetReferralsCountParams,
  IGetReferralsCountResult,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchReferralsCountParams extends IGetReferralsCountParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchReferralsCount },
  useFetchReferralsCountQuery,
  useLazyFetchReferralsCountQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferralsCount: build.query<
      IGetReferralsCountResult,
      IGetReferralsCountParams
    >({
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getReferralsCount(params);

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataCachedByParams: selectReferralsCount,
  selectLoadingCachedByParams: selectReferralsCountLoading,
  selectStateCachedByParams: selectReferralsCountState,
} = createQuerySelectors({ endpoint: fetchReferralsCount });
