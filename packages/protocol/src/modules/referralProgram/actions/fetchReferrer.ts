import { IReferrer } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchReferrer },
  useFetchReferrerQuery,
  useLazyFetchReferrerQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferrer: build.query<IReferrer, void>({
      queryFn: async () => {
        const api = MultiService.getService().getAccountingGateway();
        const data = await api.getReferrer();

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectData: selectReferrer,
  selectLoading: selectReferrerLoading,
  selectState: selectReferrerState,
} = createQuerySelectors({ endpoint: fetchReferrer });
