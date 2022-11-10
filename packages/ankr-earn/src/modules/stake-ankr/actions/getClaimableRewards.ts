import BigNumber from 'bignumber.js';

import { web3Api } from 'modules/api/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetClaimableAmountDataProps {
  validator: string;
}

export const { useGetClaimableRewardsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getClaimableRewards: build.query<BigNumber, IGetClaimableAmountDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetClaimableAmountDataProps,
        never,
        BigNumber
      >(async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getClaimableAmount(validator);

        return { data };
      }),
    }),
  }),
});
