import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { ProductPrice } from 'multirpc-sdk';

interface SubscriptionPrice extends Omit<ProductPrice, 'amount'> {
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

export const fetchUSDSubscriptionPrices = createSmartAction<
  RequestAction<ProductPrice[], SubscriptionPrice[]>
>('usdTopUp/fetchUSDSubscriptionPrices', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    getData: getSubscriptionPrices,
    onRequest: () => {
      return {
        promise: (async (): Promise<ProductPrice[]> => {
          const service = MultiService.getService();

          const { productPrices } = await service
            .getAccountGateway()
            .getUSDSubscriptionPrices();

          return productPrices;
        })(),
      };
    },
  },
}));
