import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetRestakableAmountDataProps {
  validator: string;
}

export const { useGetRestakableAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getRestakableAmount: build.query<BigNumber, IGetRestakableAmountDataProps>({
      queryFn: async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.getRestakableAmount(validator) };
      },
    }),
  }),
});
