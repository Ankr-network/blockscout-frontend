import axios from 'axios';
import BigNumber from 'bignumber.js';

import { configFromEnv } from 'modules/api/config';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

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
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const url = new URL(ANKR_RATE_URL, baseUrl).toString();

        const { data: rawData } = await axios.get(url);

        return {
          data: new BigNumber((rawData as IGetANKRPrice).rate),
        };
      }),
    }),
  }),
});
