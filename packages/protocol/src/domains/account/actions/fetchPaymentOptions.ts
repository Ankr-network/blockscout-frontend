import {
  IGetCryptoPaymentOptionsParams,
  IGetCryptoPaymentOptionsResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  useFetchPaymentOptionsQuery,
  endpoints: { fetchPaymentOptions },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPaymentOptions: build.query<
      IGetCryptoPaymentOptionsResponse,
      IGetCryptoPaymentOptionsParams | undefined
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getCryptoPaymentOptions(params);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
