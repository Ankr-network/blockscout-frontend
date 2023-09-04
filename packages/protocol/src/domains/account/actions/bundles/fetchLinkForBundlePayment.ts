import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export interface FetchLinkForBundlePaymentParams {
  group?: Web3Address;
  priceId: string;
  productId: string;
}

export const {
  endpoints: { fetchLinkForBundlePayment },
  useLazyFetchLinkForBundlePaymentQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchLinkForBundlePayment: build.query<
      string,
      FetchLinkForBundlePaymentParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ group, priceId, productId }, { dispatch }) => {
          const api = MultiService.getService().getAccountingGateway();

          const { url: data } = await api.getLinkForBundlePayment(
            {
              product_id: productId,
              product_price_id: priceId,
            },
            { group },
          );

          dispatch(setAuthData({ isCardPayment: true }));

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
