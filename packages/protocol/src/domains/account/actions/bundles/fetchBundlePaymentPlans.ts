import { BundlePaymentPlan } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchBundlePaymentPlans },
  useFetchBundlePaymentPlansQuery,
  useLazyFetchBundlePaymentPlansQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBundlePaymentPlans: build.query<BundlePaymentPlan[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getBundlePaymentPlans();

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
