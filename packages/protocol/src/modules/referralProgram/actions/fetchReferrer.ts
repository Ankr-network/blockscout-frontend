import { AccountingErrorCode, IReferrer } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchReferrer },
  useFetchReferrerQuery,
  useLazyFetchReferrerQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferrer: build.query<IReferrer | null, void>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async () => {
          const api = MultiService.getService().getAccountingGateway();
          const data = await api.getReferrer();

          return { data };
        },
        errorHandler: error => {
          if (isAxiosAccountingError(error)) {
            const code = error.response?.data.error.code;

            if (code === AccountingErrorCode.NotFound) {
              return { data: null };
            }
          }

          throw error;
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectData: selectReferrer,
  selectLoading: selectReferrerLoading,
  selectState: selectReferrerState,
} = createQuerySelectors({ endpoint: fetchReferrer });
