import BigNumber from 'bignumber.js';
import { CurrencyRate, IRate } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface CreditsRate extends Omit<CurrencyRate, 'rate'> {
  rate: BigNumber;
}

const getRate = ({ rates }: IRate): CreditsRate[] => {
  return rates?.map(rate => ({
    ...rate,
    rate: new BigNumber(rate.rate),
  }));
};

export const {
  endpoints: { accountFetchCreditRates },
  useAccountFetchCreditRatesQuery,
  useLazyAccountFetchCreditRatesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchCreditRates: build.query<CreditsRate[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const data = await service.getPublicGateway().getRate();

        return { data: getRate(data) };
      }),
    }),
  }),
});
