import BigNumber from 'bignumber.js';

import { configFromEnv } from 'modules/api/config';

import { web3Api } from '../../api/web3Api';

const { baseUrl } = configFromEnv().gatewayConfig;

const ANKR_RATE_URL = '/v1alpha/rate/ANKR';

interface IGetANKRPrice {
  rate: number;
}

export const {
  useGetAnkrPriceQuery,
  endpoints: { getAnkrPrice },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAnkrPrice: build.query<BigNumber, void>({
      query: () => new URL(ANKR_RATE_URL, baseUrl).toString(),
      transformResponse: (data: IGetANKRPrice) => new BigNumber(data.rate),
    }),
  }),
});
