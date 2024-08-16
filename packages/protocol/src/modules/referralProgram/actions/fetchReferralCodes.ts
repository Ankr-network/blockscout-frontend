import { IGetReferralCodesParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

export interface IFetchReferralCodesParams extends IGetReferralCodesParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchReferralCodes },
  useFetchReferralCodesQuery,
  useLazyFetchReferralCodesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferralCodes: build.query<string[], IFetchReferralCodesParams>({
      providesTags: [RequestType.ReferralCodes],
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getReferralCodes(params);

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectReferralCodes,
  selectLoadingCachedByParams: selectReferralCodesLoading,
  selectStateCachedByParams: selectReferralCodesState,
} = createQuerySelectors({ endpoint: fetchReferralCodes, fallback: [] });
