import BigNumber from 'bignumber.js';
import { ProductPrice } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface SubscriptionPrice extends Omit<ProductPrice, 'amount'> {
  amount: string;
}

const getSubscriptionPrices = (prices: ProductPrice[]): SubscriptionPrice[] => {
  return (
    prices
      ?.map(item => {
        const { amount } = item;

        return {
          ...item,
          amount: new BigNumber(amount).toString(),
        };
      })
      // TODO remove after backend's fix
      .filter(item => item.type === 'recurring')
      .sort((a, b) => Number(a.amount) - Number(b.amount))
  );
};

export const {
  endpoints: { usdTopUpFetchUSDSubscriptionPrices },
  useLazyUsdTopUpFetchUSDSubscriptionPricesQuery,
  useUsdTopUpFetchUSDSubscriptionPricesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpFetchUSDSubscriptionPrices: build.query<SubscriptionPrice[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const { productPrices } = await service
          .getAccountGateway()
          .getUSDSubscriptionPrices();

        return { data: getSubscriptionPrices(productPrices) };
      }),
    }),
  }),
});
