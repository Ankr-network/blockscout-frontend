import {
  IGetCryptoPaymentOptionsParams,
  IGetCryptoPaymentOptionsResult,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchPaymentOptions },
  useFetchPaymentOptionsQuery,
  useLazyFetchPaymentOptionsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPaymentOptions: build.query<
      IGetCryptoPaymentOptionsResult,
      IGetCryptoPaymentOptionsParams | void
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const { result: data } = await service
          .getAccountingGateway()
          .getCryptoPaymentOptions(params);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectState: selectPaymentOptionsState,
  selectData: selectPaymentOptions,
  selectLoading: selectPaymentOptionsLoading,
} = createQuerySelectors({ endpoint: fetchPaymentOptions });
