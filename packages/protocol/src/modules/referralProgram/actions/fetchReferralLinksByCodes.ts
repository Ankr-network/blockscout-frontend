import { IGetReferralLinksByCodesParams, IReferralLinks } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchReferralLinksByCodesParams
  extends IGetReferralLinksByCodesParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchReferralLinksByCodes },
  useFetchReferralLinksByCodesQuery,
  useLazyFetchReferralLinksByCodesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferralLinksByCodes: build.query<
      IReferralLinks,
      IFetchReferralLinksByCodesParams
    >({
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getReferralLinksByCodes(params);

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectReferralLinks,
  selectLoadingCachedByParams: selectReferralLinksLoading,
  selectStateCachedByParams: selectReferralLinksState,
} = createQuerySelectors({ endpoint: fetchReferralLinksByCodes, fallback: {} });
