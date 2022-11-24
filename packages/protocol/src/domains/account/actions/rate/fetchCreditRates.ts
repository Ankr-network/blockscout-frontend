import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { IRate, CurrencyRate } from 'multirpc-sdk';

export interface CreditsRate extends Omit<CurrencyRate, 'rate'> {
  rate: BigNumber;
}

const getRate = ({ rates }: IRate): CreditsRate[] => {
  return rates?.map(rate => ({
    ...rate,
    rate: new BigNumber(rate.rate),
  }));
};

export const fetchCreditRates = createAction<
  RequestAction<IRate, CreditsRate[]>
>('account/fetchCreditRates', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    takeLatest: true,
    getData: getRate,
    onRequest: () => ({
      promise: (async (): Promise<IRate> => {
        const service = MultiService.getService();

        const data = await service.getPublicGateway().getRate();

        return data;
      })(),
    }),
  },
}));
