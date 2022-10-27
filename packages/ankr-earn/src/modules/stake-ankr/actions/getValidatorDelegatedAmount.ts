import BigNumber from 'bignumber.js';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetDelegatedAmountDataProps {
  validator: string;
}

export const { useGetValidatorDelegatedAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getValidatorDelegatedAmount: build.query<
      BigNumber,
      IGetDelegatedAmountDataProps
    >({
      queryFn: async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return {
          data: await sdk.getDelegatedAmountByProvider(
            validator,
            await provider.getBlockNumber(),
          ),
        };
      },
    }),
  }),
});
