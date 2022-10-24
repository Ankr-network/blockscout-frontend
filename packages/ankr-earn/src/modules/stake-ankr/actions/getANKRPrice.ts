import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';

interface IGetANKRPrice {
  rate: number;
}

export const { useGetAnkrPriceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAnkrPrice: build.query<BigNumber, void>({
      query: () => 'https://api.stkr.io/v1alpha/rate/ANKR',
      transformResponse: (data: IGetANKRPrice) => new BigNumber(data.rate),
    }),
  }),
});
