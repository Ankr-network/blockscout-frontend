import BigNumber from 'bignumber.js';

import { web3Api } from 'modules/api/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

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
      queryFn: queryFnNotifyWrapper<
        IGetDelegatedAmountDataProps,
        never,
        BigNumber
      >(async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();
        const provider = await sdk.getProvider();

        return {
          data: await sdk.getDelegatedAmountByProvider(
            validator,
            await provider.getBlockNumber(),
          ),
        };
      }),
    }),
  }),
});
