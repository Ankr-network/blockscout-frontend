import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { CurrencyRate, IRate } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

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
  useFetchRateQuery,
  endpoints: { fetchRate },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRate: build.query<CreditsRate[], void>({
      queryFn: async () => {
        const service = await MultiService.getService();
        const rate = await service.getPublicGateway().getRate();
        return { data: getRate(rate) };
      },
    }),
  }),
  overrideExisting: true,
});
