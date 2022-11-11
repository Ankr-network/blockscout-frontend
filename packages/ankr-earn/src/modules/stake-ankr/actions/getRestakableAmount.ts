import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetRestakableAmountDataProps {
  validator: string;
}

export const { useGetRestakableAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getRestakableAmount: build.query<BigNumber, IGetRestakableAmountDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetRestakableAmountDataProps,
        never,
        BigNumber
      >(async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.getRestakableAmount(validator) };
      }),
    }),
  }),
});
